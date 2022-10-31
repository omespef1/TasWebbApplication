import { Component, OnInit } from "@angular/core";
import { ServicesRequestService } from '../../services/services-request/services-request.service';
import { SessionService } from "../../services/session/session.service";
import { NavigationExtras } from "@angular/router";
import { NavController, ModalController } from "@ionic/angular";
import { AlertService } from "../../services/alert/alert.service";
import { ThirdPartiesGenericPage } from "../third-parties-generic/third-parties-generic.page";
import { GENTercerosService } from '../../services/GENTerceros/genterceros.service';
import { vehicle } from '../../models/vehicle/vehicle';
import { ServicesRequest } from '../../models/service-request/programmings';

@Component({
  selector: "app-programming",
  templateUrl: "./programming.page.html",
  styleUrls: ["./programming.page.scss"],
})
export class ProgrammingPage implements OnInit {
  programmings: any[] = [];
  vehicleApprobed:vehicle;
  loading = false;
  canEdit = true;
  activeService : ServicesRequest = new ServicesRequest();
  constructor(
    private _serviceRequest: ServicesRequestService,
    public _session: SessionService,
    private nav: NavController,
    private _alert: AlertService,
    private _nav: NavController,
    private _modal: ModalController,
    private genTercerosService: GENTercerosService
  ) { }

  ngOnInit() { }
  ionViewWillEnter(event: any = null) {
    if (this.validAccess()) {
      if (this._session.isUser()) {
        if (this._session.GetUser().Grupo === "BENEFICIARIO") {
          this.GetProgrammingBeneficiario(event);
        }
        if (this._session.GetUser().Grupo == "CLIENTE") {
          this.canEdit = false;
          if (this._session.GetThirdPartie() != null && this._session.GetThirdPartie() != undefined) {

            this.GetProgramming(event);
          }
          // if(this._session.GetThirdPartie==null  || this._session.GetThirdPartie()==undefined){
          //   this.showModalThirdParties();
          // }
          // else {
          //   this.GetProgramming(event);
          // }      
        }
      } else {
        this.GetProgramming(event);
        this.checkApprovedLicensePlate();
        this.checkStatusServices();
      }
    }
  }



  async showModalThirdParties() {
    this.canEdit = false;
    const modal = await this._modal.create({
      component: ThirdPartiesGenericPage,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data) {
        this._session.SetThirdPartie(resp.data);
        this.GetProgramming(null);
      }

    });
    return await modal.present();
  }
  GetProgramming(event = null) {
  console.log( this._session.GetThirdPartie());
    this.loading = true;
    this._serviceRequest
      .GetServicesRequest(
        this._session.GetThirdPartie().IdEmpresa,
        this._session.GetThirdPartie().IdTercero
      )
      .subscribe((resp) => {
        if (event) {
          event.target.complete();
        }
        this.loading = false;
        if (resp.ObjTransaction) {
          this.programmings = resp.ObjTransaction;

        }
      });
  }

  GetProgrammingBeneficiario(event: any = null) {
    this.loading = true;
    this._serviceRequest
      .GetServicesRequestBeneficiario(
        this._session.GetUser().IdEmpresa,
        this._session.GetUser().NombreCompleto
      )
      .subscribe((resp) => {
        if (event) {
          event.target.complete();
        }
        this.loading = false;
        if (resp.ObjTransaction) {
          this.programmings = resp.ObjTransaction;
        }
      });
  }

  goProgrammingDetail(data: any) {
    let params: NavigationExtras = {
      state: {
        programming: data,
      },
    };
    this.nav.navigateForward("tabs/programming/programming-detail", params);
  }

  validAccess(): boolean {
    console.log("valid access");
    if (this._session.isUser()) {
      console.log("valid accessssss");
      console.log(this._session.GetUser());
      if (
        this._session.GetUser().Grupo !== "BENEFICIARIO" &&
        this._session.GetUser().Grupo !== "CLIENTE"
      ) {
        this._alert.showAlert(
          "Acceso no autorizado",
          "No se encuentra autorizado para acceder a esta sección"
        );
        if (this._session.GetUser().Grupo == "SUPERVISOR") {
          this._nav.navigateRoot("tabs/vehicle");
        }
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  checkApprovedLicensePlate() {
    this.genTercerosService.IsAuthorizedForService(this._session.GetThirdPartie().IdEmpresa, this._session.GetThirdPartie().IdTercero).subscribe(resp => {
      if(resp!= undefined && resp.Retorno==0){

            this.vehicleApprobed = resp.ObjTransaction;
      }

    }, err => {
      if (err.ok == false) {

        this._session.GetIsAuthorizedForServiceOffline().then(data => {
          this.vehicleApprobed = data;
        })
      }

    })

  }
  checkStatusServices() {

      this._serviceRequest.CheckPendingServices(this._session.GetThirdPartie().IdEmpresa,this._session.GetThirdPartie().IdTercero).subscribe(resp=>{
        if(resp!=undefined && resp.Retorno==0){
          if(resp.ObjTransaction!=null)
            this.activeService = resp.ObjTransaction;
            else 
            this.activeService = new ServicesRequest();
        }
        else {
          this._alert.showAlert('Error', resp.TxtError);
        }
      })
  }


  goService(){


    if(this.activeService!=undefined){
console.log(this.activeService);
debugger;
      let params: NavigationExtras = {
        state: {
          request: this.activeService
        }
      };
      this._nav.navigateForward("tabs/programming/programming-new", params);
    }
    else {
      this._nav.navigateForward("tabs/programming/programming-new");
    }
  }
}

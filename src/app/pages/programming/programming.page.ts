import { Component, OnInit } from "@angular/core";
import { ServicesRequestService } from '../../services/services-request/services-request.service';
import { SessionService } from "../../services/session/session.service";
import { NavigationExtras } from "@angular/router";
import { NavController, ModalController, AlertController } from "@ionic/angular";
import { AlertService } from "../../services/alert/alert.service";
import { ThirdPartiesGenericPage } from "../third-parties-generic/third-parties-generic.page";
import { GENTercerosService } from '../../services/GENTerceros/genterceros.service';
import { vehicle } from '../../models/vehicle/vehicle';
import { ServicesRequest } from '../../models/service-request/programmings';
import { CallService } from "src/app/services/call/call.service";

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
  locating=false;
  activeService : ServicesRequest = new ServicesRequest();
  constructor(
    private _serviceRequest: ServicesRequestService,
    public _session: SessionService,
    private nav: NavController,
    private _alert: AlertService,
    private _nav: NavController,
    private _modal: ModalController,
    private genTercerosService: GENTercerosService,
    private alertController:AlertController,
    private callService:CallService
    
    ) { }
  ngOnInit() { }
  ionViewWillEnter(event: any = null) {
    if (this.validAccess()) {
     
      if (this._session.isUser()) {
        if (this.isVip()) {
        
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

  isVip(){
    return !!this._session.GetUser() && this._session.GetUser().Grupo === "VIP";
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
  // console.log( this._session.GetThirdPartie());
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
        this._session.GetUser().IdPasajero
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
    // console.log("valid access");
    if (this._session.isUser()) {
      // console.log("valid accessssss");
      // console.log(this._session.GetUser());
      if (
        this._session.GetUser().Grupo !== "VIP" &&
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
        
        this.vehicleApprobed = this._session.GetIsAuthorizedForServiceOffline();
        
   
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

  goServiceVip(){

 
      this._nav.navigateForward("tabs/programming/programming-user-new");
  
  }

  cancelService(programming:ServicesRequest){

      this._serviceRequest.CancelService(programming.SolicitudId,programming.EmpresaId).subscribe(resp=>{
        if(resp!=null && resp.Retorno==0){
          this._alert.successSweet("Se canceló el servicio");
          this.GetProgrammingBeneficiario();
        }
      })

  }


  async confirmCancelService(request:ServicesRequest) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      message: '<strong>Está seguro de que desea cancelar el servicio? Esta acción no puede deshacerse</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.cancelService(request)
          }
        }
      ]
    });

    await alert.present();
  }

  call(callNumber:string){
  this.callService.call(callNumber);

  }




}

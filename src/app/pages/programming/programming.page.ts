import { Component, OnInit } from "@angular/core";
import { ServicesRequestService } from "../../services/services-request/services-request.service";
import { SessionService } from "../../services/session/session.service";
import { NavigationExtras } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ThirdPartie } from 'src/app/models/general/user';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: "app-programming",
  templateUrl: "./programming.page.html",
  styleUrls: ["./programming.page.scss"],
})
export class ProgrammingPage implements OnInit {
  programmings: any[] = [];
  loading = false;
  constructor(
    private _serviceRequest: ServicesRequestService,
    public _session: SessionService,
    private nav: NavController,
    private _alert:AlertService,
    private _nav:NavController
  ) {}

  ngOnInit() {
   
  }
  ionViewWillEnter(event: any = null){
    if(this.validAccess()){

    
    if(this._session.isUser()){
      if(this._session.GetUser().Grupo === "BENEFICIARIO"){
        this.GetProgrammingBeneficiario(event);
      }
    }
    else {
      this.GetProgramming(event);
    }
  }
  }
  GetProgramming(event) {
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

  validAccess():boolean {
    console.log('valid access');
    if (this._session.isUser()) {
      console.log('valid accessssss');
      console.log(this._session.GetUser());
      if (this._session.GetUser().Grupo !== "BENEFICIARIO" && this._session.GetUser().Grupo !== "CLIENTE") {
        this._alert.showAlert("Acceso no autorizado","No se encuentra autorizado para acceder a esta sección");
        if (this._session.GetUser().Grupo == "SUPERVISOR") {
          this._nav.navigateRoot("tabs/vehicle");
        }      
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  
  }
}

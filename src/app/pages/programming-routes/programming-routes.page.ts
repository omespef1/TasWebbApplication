import { EncuestaCalificacionComponent } from './../../components/encuesta-calificacion/encuesta-calificacion.component';
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
import { AuthService } from "src/app/services/auth/auth.service";
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-programming-routes",
  templateUrl: "./programming-routes.page.html",
  styleUrls: ["./programming-routes.page.scss"],
})
export class ProgrammingRoutesPage implements OnInit {
  programmings: any[] = [];
  vehicleApprobed:vehicle;
  loading = false;
  canEdit = true;
  locating=false;
  activeService : ServicesRequest = new ServicesRequest();
  selectedServiceId:number=0;
  constructor(
    private _serviceRequest: ServicesRequestService,
    public _session: SessionService,
    private nav: NavController,
    private _alert: AlertService,
    private _nav: NavController,
    private _modal: ModalController,
    private genTercerosService: GENTercerosService,
    private alertController:AlertController,
    private callService:CallService,
    private auth:AuthService
    
    ) { }

 
  ionViewWillEnter(){
   this.GetProgramming();
  }
     
   
  
  GetProgramming(event = null) {
    debugger;
  // console.log( this._session.GetThirdPartie());
    this.loading = true;
    this._serviceRequest
      .GetServicesRequestRoutes(
        this._session.GetUser().IdEmpresa     , this._session.GetUser().IdTercero  
      )
      .pipe( finalize(() => {
          this.loading = false;
        }))       
      .subscribe((resp) => {
        if (event) {
          event.target.complete();
        }
        this.loading = false;
        if (resp.Retorno==0 && resp.ObjTransaction) {
          this.programmings = resp.ObjTransaction;
          if(this.programmings.length==0){
            this._alert.presentToast('No hay rutas programadas',3000,'top');
          }
        }else {
          this._alert.presentToast(resp.TxtError,3000,'top');
          this.programmings=[];
        }
      });
  }


  // goProgrammingDetail(data: any) {
  //   let params: NavigationExtras = {
  //     state: {
  //       programming: data,
  //     },
  //   };
  //   this.nav.navigateForward("tabs/programming/programming-detail", params);
  // }

  singUp(requestId:number){
  
    this.selectedServiceId=requestId;
    this._serviceRequest.signUpPassenger(requestId, this._session.GetUser().IdEmpresa, this._session.GetUser().IdTercero)
    .pipe( finalize(() => {
      this.loading = false;
      this.selectedServiceId=0;
    }))
    .subscribe((resp)=>{
      if (resp.Retorno==0) {
        this._alert.successSweet("Inscripción exitosa");
        this.GetProgramming();
      }else {
        this._alert.presentToast(resp.TxtError,3000,'top');       
      }
    });
  }



  goService(){

    if(this.activeService.SolicitudId>0){

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




  call(callNumber:string){
  this.callService.call(callNumber);

  }




}

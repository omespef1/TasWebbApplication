import { Component } from "@angular/core";
import { timer } from 'rxjs';
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SessionService } from "./services/session/session.service";
import { AuthService } from "./services/auth/auth.service";
import { NetworkService } from './services/network/network.service';
import { NotificationsService } from './services/push/notifications.service';
import { TransportRequestService } from './services/transport-request/transport-request.service';
import { PoliticalDivisionService } from "./services/political-division/political-division.service";
import { GescentrocostosService } from './services/gencentrocostos/gescentrocostos.service';
import { VehicleService } from './services/vehicle/vehicle.service';
import { GENTercerosService } from './services/GENTerceros/genterceros.service';
import { ServicesRequestService } from "./services/services-request/services-request.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _sesion: SessionService,
    private _auth: AuthService,
    private _push:NotificationsService,
    private _transport:TransportRequestService,
    private genDivisionPoliticalService:PoliticalDivisionService,
    private costCenterService:GescentrocostosService,
    private vehicleService:VehicleService,
    private genTercerosService:GENTercerosService,
    private requestService: ServicesRequestService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {              
      this.statusBar.styleDefault();    
      this.splashScreen.hide();
      this._push.init_Notifications();
      this._auth.signInDirect();
      this.LoadFirstSettings();
      this.SetRemoteTransport();
      if(this._sesion.GetUser().IdTercero>0){
        console.log('leyendo tercero');
        this.getDivisionPolitical();
      this.getAliParams();
      this.getModalities();
      this.getInformationThirdPartie();
      this.checkApprovedLicensePlate();
      this.GetLastServiceThirdPartieApproved();
      }
      
      
    });
  }


  SetRemoteTransport() {
    setInterval(() => {
      this._transport.GetTransportRequestFailed().then(() => {
        console.log('Pendientes de transporte enviados');
      });
    }, 30000);
  }




  LoadFirstSettings() {
    const mobile = this._sesion.GetMobile();
    if (mobile == null || mobile === undefined) {
      this._sesion.SetMobile(true);
    }
    const wifi = this._sesion.GetWifi();
    if (wifi == null || wifi === undefined) {
      this._sesion.SetWifi(true);
    }
    const groupEnlistment = this._sesion.getGroupEnlistment();
    if(groupEnlistment==null || groupEnlistment==undefined){
      this._sesion.setGroupEnlistment(true);
    }
  }


  getDivisionPolitical(){
    this.genDivisionPoliticalService.GetPoliticalDivisionAll(1).subscribe(resp=>{
      if(resp!=null && resp.Retorno==0){
        this._sesion.SetPoliticalDivisionOffline(resp.ObjTransaction);
      }
    })
  }


  getModalities() {
    this.costCenterService
      .GetCostCenterCompany(this._sesion.GetThirdPartie().IdEmpresa)
      .subscribe((resp) => {
        if (resp != null && resp.Retorno == 0) {
          this._sesion.setModalitiesOffline(resp.ObjTransaction);
        }
      });
  }


  getAliParams() {
    this.vehicleService.GetDocumentsValidationCompany(this._sesion.GetThirdPartie().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this._sesion.setAliParamsOffline(resp.ObjTransaction);
      }
    })
  }

  getInformationThirdPartie(){
  this.genTercerosService.GetById(this._sesion.GetThirdPartie().IdEmpresa, this._sesion.GetThirdPartie().IdTercero).subscribe(resp => {
    if (resp != null && resp.Retorno == 0) {
      this._sesion.SetByIdOffline(resp.ObjTransaction);
      console.log(resp.ObjTransaction);
    }
  })

  }

  checkApprovedLicensePlate() {
    return this.genTercerosService
      .IsAuthorizedForService(
        this._sesion.GetThirdPartie().IdEmpresa,
        this._sesion.GetThirdPartie().IdTercero
      )
      .subscribe((resp) => {
        if (resp != undefined && resp.Retorno == 0) {
          debugger;
          this._sesion.setIsAuthorizedForServiceOffline(resp.ObjTransaction);
        }
      });
  }

  GetLastServiceThirdPartieApproved() {
    this.requestService.GetLastsServiceThirdPartieApproved(this._sesion.GetThirdPartie().IdEmpresa, this._sesion.GetThirdPartie().IdTercero).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
            this._sesion.setLastsServiceThirdPartieApprovedOffline(resp.ObjTransaction);
      }
    })
  }
}

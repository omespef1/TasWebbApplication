import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { loginRequest } from "../../models/general/loginRequest";
import { NavController, ModalController, Platform } from "@ionic/angular";
import { AlertService } from "../../services/alert/alert.service";
import { SessionService } from "../../services/session/session.service";
import { BusinessPage } from "../business/business.page";
import { ThirdPartie } from "../../models/general/user";
// import { TouchIdService } from "../../services/touch/touch-id.service";
import {
  NetworkService,
  ConnectionStatus
} from "src/app/services/network/network.service";
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { business } from '../../models/business/business';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  showPass = false;
  user: loginRequest = new loginRequest();
  touchId: boolean = false;
  businessName:string='INGRESO';
  constructor(
    private auth: AuthService,
    private router: Router,
    private _alert: AlertService,
    private _nav: NavController,
    public _sesion: SessionService,
    private _modal: ModalController,
    // private _touch: TouchIdService,
    private _platform: Platform,
    private _network: NetworkService,
    private _auth:AuthService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.LoadBusiness();
    // this.GetTouchId();
  }

  async LoadBusiness() {
    const business = this._sesion.GetBussiness();
    //console.log(business);
    if (business == null) {
      await this.showModalBusiness();
    }
  }

  async showModalBusiness() {
    const modal = await this._modal.create({
      component: BusinessPage
    });
    modal.onDidDismiss().then(resp => {
     const _businessName: business= resp.data;
      this._sesion.SetBusiness(resp.data);
      this.businessName = _businessName.NombreEmpresa;
    });
    return await modal.present();
  }

  signIn() {
    this.loading = true;
    const businessStorage = this._sesion.GetBussiness();
    this.user.business = businessStorage.CodigoEmpresa;

    //console.log(this.user);

    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this.auth.signIn(this.user).subscribe(
        resp => {
          //console.log(resp);
          this.loading = false;
          if (resp.Retorno == 1) {
            this._alert.showAlert("Ingreso fallido", `${resp.TxtError}`);
          } else {                       
            // this._nav.setDirection('root');
            this._auth.goApp();
          }
        },
        err => {
          this.loading = false;
          this._alert.showAlert("Error", err);
        }
      );
    } else {
      this.auth.signInDirectOffline();
      this._auth.goApp();
      //console.log("paso autoiza");
    }
  }
  changeBusiness() {
    this.showModalBusiness();
  }

  // async GetTouchId() {
  //   if (this._platform.is("cordova")) {
  //     await this._platform.ready();
  //     this._touch.isAvailale().then(
  //       result => {
  //         // if (result === "finger" || result === "face") {
  //           //console.log(`Autenticación disponible por ${result}`);
  //           this.touchId = true;
  //         // }
  //       },
  //       err => {}
  //     );
  //   }
  // }

  // logTouchId() {
  //   if (this._platform.is("cordova")) {
  //     this._touch
  //       .verifyFingerPrint("Ingresa tu huella dactilar para ingresar")
  //       .then((result: any) => {
  //         //console.log(`Autenticación resultado  es ${result}`);
  //         this.auth.signInDirectTouch();
  //         this._auth.goApp();
  //         // if (result == "Success") {
  //         //   this.auth.signInDirectTouch();
  //         //   this.router.navigateByUrl("tabs/vehicle");
  //         // } else {
  //         //   this._alert.showAlert("Error", "Verificación fallida");
  //         // }
  //       })
  //       .catch((error: any) => {
  //         this._alert.showAlert("Error", "Verificación fallida");
  //       });
  //   }
  // }

  // goApp(){

  // if (this._sesion.GetUser()!==undefined){
  //   this._alert.showAlert(
  //     "Bienvenido!",
  //     `Ingresaste como usuario ${ this._sesion.GetUser().NombreCompleto}`
  //   );

  //   this._nav.navigateRoot("tabs/thirdparties");
  // }
  // else {
    
  //   this._alert.showAlert(
  //     "Bienvenido!",
  //     `Ingresaste como ${ this._sesion.GetThirdPartie().NombreCompleto}`
  //   );
  //   this._nav.navigateRoot("tabs/vehicle");

  // }
  // }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { loginRequest } from "../../models/general/loginRequest";
import { NavController, ModalController, Platform } from "@ionic/angular";
import { AlertService } from "../../services/alert/alert.service";
import { SessionService } from "../../services/session/session.service";
import { BusinessPage } from "../business/business.page";
// import { TouchIdService } from "../../services/touch/touch-id.service";
import {
  NetworkService,
  ConnectionStatus
} from "src/app/services/network/network.service";
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { business } from '../../models/business/business';
import { config } from "src/assets/config/settings";

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
  logoApp: string = "assets/imgs/icon.png"; // URL predeterminada
  currentVersion = config.currentVersion;
  constructor(
    private auth: AuthService,
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
    if (business) {
      this.logoApp = !!business.LogoApp? business.LogoApp:this.logoApp; // Asumiendo que LogoApp es la propiedad del objeto business
    }
  
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
      this.logoApp = !!_businessName.LogoApp?_businessName.LogoApp:'assets/imgs/icon.png';
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

  cleanSessions(){
    localStorage.clear();
    location.reload();
  }

}

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
import { ThirdPartie, ThirdPartieWithCompany } from "src/app/models/general/user";

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
  businessName: string = 'INGRESO';
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
    private _auth: AuthService
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    // this.LoadBusiness();
    // this.GetTouchId();
  }

  async LoadBusiness() {

    const business = this._sesion.GetBussiness();
    if (business) {
      this.logoApp = !!business.LogoApp ? business.LogoApp : this.logoApp; // Asumiendo que LogoApp es la propiedad del objeto business
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

      const _businessName: business = resp.data;
      this._sesion.SetBusiness(resp.data);
      this.businessName = _businessName.NombreEmpresa;
      this.logoApp = !!_businessName.LogoApp ? _businessName.LogoApp : 'assets/imgs/icon.png';
    });
    return await modal.present();
  }

  signIn() {
    this.loading = true;

    if (this._network.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      this.auth.signInAutoEmpresa(this.user).subscribe({
        next: async resp => {
          this.loading = false;
          debugger;
          if (resp.ObjTransaction && resp.ObjTransaction.length == 1) {
            this.auth.setSessionUser(resp.ObjTransaction[0]);
            this.setCompanySession(resp.ObjTransaction[0]);
            this._auth.goApp();
          }
          if (resp.ObjTransaction && resp.ObjTransaction.length > 1) {
            const empresasUnicas = Array.from(
              new Set(resp.ObjTransaction.map(x => x.IdEmpresa))
            );
            const modal = await this._modal.create({
              component: BusinessPage,
              componentProps: {
                allowedCompanies: empresasUnicas
              }
            });
            modal.onDidDismiss().then(res => {
              const selectedCompany: business = res.data;
              const selectedThirdPartie = resp.ObjTransaction.find(
                tp => tp.IdEmpresa === selectedCompany.CodigoEmpresa
              );

              if (selectedThirdPartie) {
                this.auth.setSessionUser(selectedThirdPartie);
                this.setCompanySession(selectedThirdPartie);
                this._auth.goApp();
              }
            });
            await modal.present();
          }
        },
        error: err => {
          this.loading = false;
          this._alert.showAlert("Error", err);
        }
      });
    } else {
      this.auth.signInDirectOffline();
      this._auth.goApp();
    }
  }

  setCompanySession(tp: ThirdPartieWithCompany) {

    const selectedCompany: business = {
      CodigoEmpresa: tp.IdEmpresa,
      NombreEmpresa: tp.NombreEmpresa,
      Estado: tp.Estado,
      EmpresaSigla: tp.EmpresaSigla,
      LogoApp: tp.LogoApp,
      LogoAppHori: tp.LogoAppHori,
    };
    this._sesion.SetBusiness(selectedCompany);
    this.businessName = selectedCompany.NombreEmpresa;
    this.logoApp = selectedCompany.LogoApp || 'assets/imgs/icon.png';

  }

  changeBusiness() {
    this.showModalBusiness();
  }

  cleanSessions() {
    localStorage.clear();
    location.reload();
  }

}



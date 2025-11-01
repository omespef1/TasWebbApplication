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
          const trans: ThirdPartieWithCompany[] = resp.ObjTransaction || [];

          if (trans.length === 1) {
            // Caso simple: un solo resultado
            this.auth.setSessionUser(trans[0]);
            this.setCompanySession(trans[0]);
            this._auth.goApp();
            return;
          }

            if (trans.length > 1) {
              // Verificar si todas las empresas son la misma
              const empresasUnicas = Array.from(new Set(trans.map(x => x.IdEmpresa)));

              if (empresasUnicas.length === 1) {
                // Misma empresa: verificar coexistencia de roles especiales
                const pasajeroRuta = trans.find(t => t.Grupo === 'PASAJERO_RUTA');
                const vip = trans.find(t => ['VIP', 'VIP0', 'VIP1'].includes(t.Grupo));

                if (pasajeroRuta && vip) {
                  // Mostrar selección de funcionalidad (multi-rol misma empresa)
                  this.showRoleSelectionAlert(pasajeroRuta, vip);
                  return;
                }
                // Si no están ambos roles, tomamos el primero (comportamiento fallback)
                this.auth.setSessionUser(trans[0]);
                this.setCompanySession(trans[0]);
                this._auth.goApp();
                return;
              }

              // Empresas diferentes: flujo original (selección de empresa)
              const modal = await this._modal.create({
                component: BusinessPage,
                componentProps: {
                  allowedCompanies: empresasUnicas
                }
              });
              modal.onDidDismiss().then(res => {
                const selectedCompany: business = res.data;
                if (!selectedCompany) { return; }
                const selectedThirdPartie = trans.find(
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

  /**
   * Muestra un alert para seleccionar funcionalidad cuando el usuario
   * tiene dos roles (PASAJERO_RUTA y VIP/VIP0/VIP1) en la misma empresa.
   */
  private showRoleSelectionAlert(pasajeroRuta: ThirdPartieWithCompany, vip: ThirdPartieWithCompany) {
    const header = 'Selecciona funcionalidad';
    const subHeader = '';
    const message = '¿Qué funcionalidad desea usar?';

    // IDs solicitados para cada opción
    const INPUT_ID_SERVICIOS = 'SERVICIOS_PROGRAMADOS';
    const INPUT_ID_RUTAS = 'RUTAS_INSTITUCIONALES';

    const inputs = [
      {
        name: 'feature',
        type: 'radio',
        label: 'Servicios programados',
        value: INPUT_ID_SERVICIOS,
        checked: true
      },
      {
        name: 'feature',
        type: 'radio',
        label: 'Rutas institucionales',
        value: INPUT_ID_RUTAS
      }
    ];

    const buttons = [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: (selectedValue: string) => {
          let chosen: ThirdPartieWithCompany;
          if (selectedValue === INPUT_ID_RUTAS) {
            chosen = pasajeroRuta; // Rutas institucionales => PASAJERO_RUTA
          } else {
            chosen = vip; // Servicios programados => VIP/VIP0/VIP1
          }
          this.auth.setSessionUser(chosen);
          this.setCompanySession(chosen);
          this._auth.goApp();
        }
      }
    ];

    this._alert.showCustomAlert(header, subHeader, message, buttons, inputs, true);
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



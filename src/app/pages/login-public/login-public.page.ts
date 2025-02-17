import { GESListaPasajerosRutas } from './../../models/geslistapasajerosrutas/geslistapasajerosrutas.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SessionService } from 'src/app/services/session/session.service';
import { config } from 'src/assets/config/settings';
import { BussinesPublicPage } from '../bussines-public/bussines-public.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoutesPublicPage } from '../routes-public/routes-public.page';
import { GesRutas, GESRutasPuntosEncuentro } from 'src/app/models/gesrutas/gesturas.model';
import { PointsPublicPage } from '../points-public/points-public.page';
import { GESRutasService } from 'src/app/services/gesrutas/gesrutas.service';
import { ThirdPartiePublic } from 'src/app/models/general/user';

@Component({
  selector: 'app-login-public',
  templateUrl: './login-public.page.html',
  styleUrls: ['./login-public.page.scss'],
})
export class LoginPublicPage implements OnInit {

  loading = false;
  showPass = false;
  businessName: string = 'INGRESO';
  logoApp: string = "assets/imgs/icon.png"; // URL predeterminada
  ThirdPartiePublicClient: ThirdPartiePublic | undefined = undefined;
  routeSelected: GesRutas | undefined = undefined;
  currentVersion = config.currentVersion;
  pointSelected: GESRutasPuntosEncuentro | undefined;
  register: GESListaPasajerosRutas = new GESListaPasajerosRutas();
  constructor(

    private _alert: AlertService,
    private _modal: ModalController,
    private auth: AuthService
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.LoadBusiness();
  }

  async LoadBusiness() {

    await this.showModalBusinessPublic();

  }

  async showModalBusinessPublic() {
    const modal = await this._modal.create({
      component: BussinesPublicPage
    });
    modal.onDidDismiss().then(resp => {

      const _businessName: ThirdPartiePublic = resp.data;
      this.businessName = _businessName.NombreCompleto;
      this.ThirdPartiePublicClient = resp.data;
      this.register.IdEmpresa =this.ThirdPartiePublicClient.IdEmpresa;
      this.register.IdCliente = this.ThirdPartiePublicClient.IdTercero;
      this.register.ContratoId = this.ThirdPartiePublicClient.ContratoId;
      this.showModalRutas();
    });
    return await modal.present();
  }


  async showModalRutas() {
    const modal = await this._modal.create({
      component: RoutesPublicPage,
      componentProps: { companyCode: this.ThirdPartiePublicClient.IdEmpresa, contractId: this.ThirdPartiePublicClient.ContratoId }
    });
    modal.onDidDismiss().then(resp => {
      this.routeSelected = resp.data;
    this.register.IdRuta = this.routeSelected.RutaId;
      this.showModalPoints();
    });

    return await modal.present();
  }
  isValid(): boolean {
    return this.register.Email &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.register.Email) && // Valida formato email
           this.register.IdPunto > 0 &&
           this.register.IdRuta > 0;
  }


  async showModalPoints() {
    const modal = await this._modal.create({
      component: PointsPublicPage,
      componentProps: { companyCode: this.ThirdPartiePublicClient.IdEmpresa, idRoute:  this.routeSelected.RutaId }
    });
    modal.onDidDismiss().then(resp => {
      this.pointSelected = resp.data;
      this.register.IdPunto = this.pointSelected.Id;
    });

    return await modal.present();
  }


  signIn() {

    this.auth.registerPassengerPublic(this.register).subscribe(
      resp => {
        //console.log(resp);
        this.loading = false;
        if (resp.Retorno == 1) {
          this._alert.showAlert("Registro fallido", `${resp.TxtError}`);
        } else {
          // this._nav.setDirection('root');
          this._alert.showAlert("Registro exitoso!", `Se ha realizado el registro de manera exitosa`);
          this.register = new GESListaPasajerosRutas();
        setTimeout(() => {
          location.reload();
        }, 4000);
        }
      },
      err => {
        this.loading = false;
        this._alert.showAlert("Error", err);
      }
    );

  }


}

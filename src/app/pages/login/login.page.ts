import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { loginRequest } from "../../models/general/loginRequest";
import { NavController, ModalController } from "@ionic/angular";
import { AlertService } from "../../services/alert/alert.service";
import { SessionService } from "../../services/session/session.service";
import { BusinessPage } from "../business/business.page";
import { ThirdPartie } from "../../models/general/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  showPass = false;
  user: loginRequest = new loginRequest();
  constructor(
    private auth: AuthService,
    private router: Router,
    private _alert: AlertService,
    private _nav: NavController,
    private _sesion: SessionService,
    private _modal: ModalController
  ) {}

  ngOnInit() {

    this.LoadBusiness();
  }

  async LoadBusiness() {
    const business = this._sesion.GetBussiness();
    console.log(business);
    if (business==null) {
      await this.showModalBusiness();
    }
  }

  async showModalBusiness() {
    const modal = await this._modal.create({
      component: BusinessPage
    });
      modal.onDidDismiss().then((resp)=>{
       console.log(resp);
         this._sesion.SetBusiness(resp.data);
     })
    return await modal.present();
  }

  signIn() {
    this.loading = true;
    const businessStorage = this._sesion.GetBussiness();
    this.user.business = businessStorage.CodigoEmpresa;
    
    console.log(this.user);
    this.auth.signIn(this.user).subscribe(
      resp => {
        console.log(resp);
        this.loading = false;
        if (resp.Retorno == 1) {
          this._alert.showAlert('Ingreso fallido', `${resp.TxtError}`);
        } else {
          const user: ThirdPartie = resp.ObjTransaction;
          this._alert.showAlert(
            'Bienvenido!',
            `Ingresaste como ${user.NombreCompleto}`
          );
          this.router.navigateByUrl('vehicle')
        }
      },
      err => {
        this.loading = false;
        this._alert.showAlert('Error', err);
      }
    );
  }
  changeBusiness(){
    this.showModalBusiness(); 
  }
}

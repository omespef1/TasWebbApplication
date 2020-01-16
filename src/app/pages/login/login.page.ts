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
import { TouchIdService } from '../../services/touch/touch-id.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/network/network.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  showPass = false;
  user: loginRequest = new loginRequest();
  touchId:boolean=false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private _alert: AlertService,
    private _nav: NavController,
    private _sesion: SessionService,
    private _modal: ModalController,
    private _touch:TouchIdService,
    private _platform:Platform,
    private _network:NetworkService
  ) {}

  ngOnInit() {  
  
  }
  ionViewWillEnter() {
    this.LoadBusiness();
    this.GetTouchId();

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


    if(this._network.getCurrentNetworkStatus()== ConnectionStatus.Online){

 
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
          // this._nav.setDirection('root');
          this.router.navigateByUrl('tabs/vehicle');
        }
      },
      err => {
        this.loading = false;
        this._alert.showAlert('Error', err);
      }
    );
    }
    else {
      this.auth.signInDirectOffline();
      this.router.navigateByUrl("tabs/vehicle");
      console.log('paso autoiza');
    }
  }
  changeBusiness(){
    this.showModalBusiness(); 
  }

  GetTouchId(){
    if(this._platform.is('cordova')){
    this._touch.isAvailale().then(()=>{
        this.touchId=true;
    },err=>{

    })
  }
  }

  logTouchId(){

    if(this._platform.is('cordova')){
      this._touch.verifyFingerPrint('Ingresa tu huella dactilar para ingresar').then(()=>{
        console.log('bio ok');
        this.auth.signInDirectTouch();
        this.router.navigateByUrl("tabs/vehicle");
        console.log('paso autoiza');
      },err=>{
  
      })
    }
 
  }
}

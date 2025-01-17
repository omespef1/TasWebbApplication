import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session/session.service";
import { ThirdPartie } from '../../models/general/user';
import { AuthService } from '../../services/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  ThirdPartie:ThirdPartie;
  mobile=false;
  wifi=false;
  groupEnlistment=false;
  constructor(public _sesion: SessionService,private _auth:AuthService,private _nav:NavController,public sesion:SessionService) {

   
  }


  ngOnInit() {
    this.ThirdPartie = this._sesion.GetThirdPartie();
   

  }

  ionViewWillEnter(){
    this.ThirdPartie = this._sesion.GetThirdPartie();
    this.mobile = this.GetMobile();
    this.wifi = this.GetWifi();
    this.groupEnlistment = this.GetGroupEnlistment();

  }

  SetWifi() {
    //console.log(this.wifi);
    this._sesion.SetWifi(this.wifi);
  }

  GetWifi() {
    return this._sesion.GetWifi();
  }
  SetMobile() {
    //console.log(this.mobile);
    this._sesion.SetMobile(this.mobile);
  }

  GetMobile() {
    return this._sesion.GetMobile();
  }


  SetGroupEnlistment() {   
    this._sesion.setGroupEnlistment(this.groupEnlistment);
  }

  GetGroupEnlistment(){
   return this._sesion.getGroupEnlistment();
  }
  GoOut(){  
    // console.log('saliendo');
    this._auth.signOut();
  }
  goChangePassword(){
    this._nav.navigateRoot('tabs/forget-password');
  }
}

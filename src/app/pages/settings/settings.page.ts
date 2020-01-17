import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session/session.service";
import { ThirdPartie } from '../../models/general/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  ThirdPartie:ThirdPartie;
  mobile=false;
  wifi=false;
  constructor(private _sesion: SessionService,private _auth:AuthService) {

   
  }


  ngOnInit() {
    this.ThirdPartie = this._sesion.GetThirdPartie();
   

  }

  ionViewWillEnter(){
    this.ThirdPartie = this._sesion.GetThirdPartie();
    this.mobile = this.GetMobile();
    this.wifi = this.GetWifi();
  }

  SetWifi() {
    console.log(this.wifi);
    this._sesion.SetWifi(this.wifi);
  }

  GetWifi() {
    return this._sesion.GetWifi();
  }
  SetMobile() {
    console.log(this.mobile);
    this._sesion.SetMobile(this.mobile);
  }

  GetMobile() {
    return this._sesion.GetMobile();
  }

  GoOut(){
    this._auth.signOut();
  }
}

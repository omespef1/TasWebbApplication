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

  constructor(private _sesion: SessionService,private _auth:AuthService) {

    this.ThirdPartie = this._sesion.GetThirdPartie();
  }


  ngOnInit() {



  }

  SetWifi(value) {
    console.log(value);
    this._sesion.SetWifi(value);
  }

  GetWifi() {
    return this._sesion.GetWifi();
  }
  SetMobile(value) {
    console.log(value);
    this._sesion.SetMobile(value);
  }

  GetMobile() {
    return this._sesion.GetMobile();
  }

  GoOut(){
    this._auth.signOut();
  }
}

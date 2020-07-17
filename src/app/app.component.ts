import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SessionService } from "./services/session/session.service";
import { AuthService } from "./services/auth/auth.service";
import { IfStmt } from "@angular/compiler";
import { NetworkService } from './services/network/network.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _sesion: SessionService,
    private _auth: AuthService,
    private _network: NetworkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._auth.signInDirect();
      this.LoadFirstSettings();
    });
  }

  LoadFirstSettings() {
    const mobile = this._sesion.GetMobile();
    if (mobile == null || mobile === undefined) {
      this._sesion.SetMobile(true);
    }
    const wifi = this._sesion.GetWifi();
    if (wifi == null || wifi === undefined) {
      this._sesion.SetWifi(true);
    }
    const groupEnlistment = this._sesion.getGroupEnlistment();
    if(groupEnlistment==null || groupEnlistment==undefined){
      this._sesion.setGroupEnlistment(true);
    }
  }
}

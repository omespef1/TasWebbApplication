import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject, observable } from "rxjs";
import { filter, tap, take, map } from "rxjs/operators";
import { transaction } from "src/app/models/general/transaction";
import { HttpManagerService } from "../httpManager/http-manager.service";
import { loginRequest } from "../../models/general/loginRequest";
import { SessionService } from "../session/session.service";
import { AlertService } from "../alert/alert.service";
import { ThirdPartie } from "src/app/models/general/user";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private router: Router,
    private _http: HttpManagerService,
    private _sesion: SessionService,
    private _alert: AlertService,
    private nav: NavController,
    private _nav:NavController
  ) {}

  signIn(credentials: loginRequest) {
    //console.log(credentials);
    return this._http.Post<transaction>("/login", credentials).pipe(
      tap(async (userData: transaction) => {
        if (userData) {
          if (userData.Retorno === 0) {
            const thirdPartie: ThirdPartie = userData.ObjTransaction;
            if (
              thirdPartie.IdTercero == 0 &&
              thirdPartie.Identificacion == ""
            ) {
              this._sesion.SetUser(thirdPartie);
            }
            else {
              this._sesion.SetThirdPartie(userData.ObjTransaction);
              this._sesion.SetThirdPartieBio(userData.ObjTransaction);
              this._sesion.setOfflineUser(userData.ObjTransaction);
            }
          
          }
        }
      })
    );
  }

  signInDirect() {

    if (
      (this._sesion.GetThirdPartie() != null &&
      this._sesion.GetThirdPartie() !== undefined) || (  this._sesion.GetUser()!=undefined && this._sesion.GetUser()!=null)
    ) {

      this.goApp();

    }
   
  }

  signInDirectTouch() {
    const thirdPartieBio: ThirdPartie = this._sesion.GetThirdPartieBio();
    const userBio: ThirdPartie = this._sesion.GetUserBio();
    if(userBio!=undefined && userBio!=null){
    this._sesion.SetUser(userBio);
    }
   else {

    this._sesion.SetThirdPartie(thirdPartieBio);
   }
    this.goApp();
  }

  signInDirectOffline() {
    const user: ThirdPartie = this._sesion.getOfflineUser();
    this._sesion.SetThirdPartie(user);
    //console.log(user);
    this._alert.showAlert(
      "Bienvenido!",
      `Estás Offline, solo puedes ingresasar como ${user.NombreCompleto}`
    );
  }

  async signOut() {
    // await this.storage.set("user", null);
    this.nav.navigateRoot("login");
    this._sesion.removeThirdPartie();
    this._sesion.removeUser();
  }

  changePassword(changePass: any) {
    return this._http.Post<transaction>("/login/ChangePassword", changePass);
  }

  goApp(){

    if (this._sesion.GetUser()!==undefined && this._sesion.GetUser()!=null){
      this._alert.showAlert(
        "Bienvenido!",
        `Ingresaste como usuario ${ this._sesion.GetUser().NombreCompleto}`
      );
      this._nav.navigateRoot("third-parties");
    }
    else {
      
      this._alert.showAlert(
        "Bienvenido!",
        `Ingresaste como ${ this._sesion.GetThirdPartie().NombreCompleto}`
      );
      this._nav.navigateRoot("tabs/vehicle");
    }
    }
}

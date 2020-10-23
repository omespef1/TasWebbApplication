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
import { ThirdPartiesService } from "../third-parties/third-parties.service";
import { NotificationsService } from "../push/notifications.service";
import { OneSignalThirdPartiesService } from "../OneSignalThirdParties/one-signal-third-parties.service";
import { OneSignalEntitie } from "../../models/one-signal-third-parties/one-signal-third-parties";
import { OneSignalUsersService } from "../oneSignalUsers/one-signal-users.service";

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
    private _nav: NavController,
    private _thirdParties: ThirdPartiesService,
    private _push: NotificationsService,
    private _thirdPartieOneSignal: OneSignalThirdPartiesService,
    private usersOneSignal: OneSignalUsersService
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
            } else {
              this._sesion.SetThirdPartie(userData.ObjTransaction);
              this._sesion.SetThirdPartieBio(userData.ObjTransaction);
              this._sesion.setOfflineUser(userData.ObjTransaction);
              this._thirdParties.addThirdPartie(userData.ObjTransaction);
            }
          }
        }
      })
    );
  }

  validThirdPartie(credentials: loginRequest) {
    return this._http.Post<transaction>("/login", credentials).pipe(
      tap(async (userData: transaction) => {
        return userData;
      })
    );
  }

  signInDirect() {
    if (
      (this._sesion.GetThirdPartie() != null &&
        this._sesion.GetThirdPartie() !== undefined) ||
      (this._sesion.GetUser() != undefined && this._sesion.GetUser() != null)
    ) {
      if (
        this._sesion.GetUser() == undefined ||
        this._sesion.GetUser() == null
      ) {
        this._thirdParties.addThirdPartie(this._sesion.GetThirdPartie());
      }
      this.goApp();
    }
  }

  signInDirectTouch() {
    const thirdPartieBio: ThirdPartie = this._sesion.GetThirdPartieBio();
    const userBio: ThirdPartie = this._sesion.GetUserBio();
    if (userBio != undefined && userBio != null) {
      this._sesion.SetUser(userBio);
    } else {
      this._sesion.SetThirdPartie(thirdPartieBio);
      this._thirdParties.addThirdPartie(thirdPartieBio);
    }
    this.goApp();
  }

  signInDirectOffline() {
    const user: ThirdPartie = this._sesion.getOfflineUser();
    this._sesion.SetThirdPartie(user);
    this._thirdParties.addThirdPartie(user);
    //console.log(user);
    this._alert.showAlert(
      "Bienvenido!",
      `Estás Offline, solo puedes ingresasar como ${user.NombreCompleto}`
    );
  }

  async signOut() {
    // await this.storage.set("user", null);
    this.RemoveOneSignalId();
    this._thirdParties.removeThirdPartiesSession();
    this.nav.navigateRoot("login");
    this._sesion.removeThirdPartie();
    this._sesion.removeUser();
  }
  changePassword(changePass: any) {
    return this._http.Post<transaction>("/login/ChangePassword", changePass);
  }

  goApp() {
    this.SetOneSignalId();
    if (this._sesion.isUser()) {
      this._alert.showAlert(
        "Bienvenido!",
        `Ingresaste como usuario ${this._sesion.GetUser().NombreCompleto}`
      );
      console.log(this._sesion.GetUser());
      if (this._sesion.GetUser().Grupo == "SUPERVISOR")
        this._nav.navigateRoot("third-parties");
      if (this._sesion.GetUser().Grupo == "BENEFICIARIO")
        this._nav.navigateRoot("tabs/programming");
      if (this._sesion.GetUser().Grupo == "CLIENTE")
        this._nav.navigateRoot("tabs/programming");
    } else {
      this._alert.showAlert(
        "Bienvenido!",
        `Ingresaste como ${this._sesion.GetThirdPartie().NombreCompleto}`
      );

      this._nav.navigateRoot("tabs/vehicle");
    }
  }

  SetOneSignalId() {
    this._sesion.getOneSignalId().then((resp) => {
      if (resp !== undefined && resp !== null) {
        const userOneSingnal: OneSignalEntitie = new OneSignalEntitie();
        userOneSingnal.OneSignalId = resp.userId;
        if (this._sesion.isUser()) {
          userOneSingnal.UserName = this._sesion.GetUser().NombreCompleto;
          userOneSingnal.CompanyId = this._sesion.GetUser().IdEmpresa;
          this.usersOneSignal.PostOneSignalUser(userOneSingnal).subscribe((resp:transaction)=>{
            if(resp.Retorno==0){
              console.log('NOT OK');
            }
          })
        } else {
          userOneSingnal.ThirdPartie = this._sesion.GetThirdPartie().IdTercero;
          userOneSingnal.CompanyId = this._sesion.GetThirdPartie().IdEmpresa;
          this._thirdPartieOneSignal.PostOneSignalThirdPartie(userOneSingnal).subscribe((resp:transaction)=>{
            if(resp.Retorno==0){
              console.log('NOT OK');
            }
          })
        }
      }
    });
  }

  RemoveOneSignalId() {
    this._sesion.getOneSignalId().then((resp) => {
      if (resp !== undefined && resp !== null) {
        const userOneSingnal: OneSignalEntitie = new OneSignalEntitie();
        userOneSingnal.OneSignalId = resp.userId;
        if (this._sesion.isUser()) {
          userOneSingnal.UserName = this._sesion.GetUser().NombreCompleto;
          userOneSingnal.CompanyId = this._sesion.GetUser().IdEmpresa;
          this.usersOneSignal.DeleteOneSignalUser(userOneSingnal).subscribe((resp:transaction)=>{
            if(resp.Retorno==0){
              console.log('NOT OK');
            }
          })
        } else {
          userOneSingnal.ThirdPartie = this._sesion.GetThirdPartie().IdTercero;
          userOneSingnal.CompanyId = this._sesion.GetThirdPartie().IdEmpresa;
          this._thirdPartieOneSignal.DeleteOneSignalThirdPartie(userOneSingnal).subscribe((resp:transaction)=>{
            if(resp.Retorno==0){
              console.log('NOT OK');
            }
          })
        }
      }
    });
  }
}

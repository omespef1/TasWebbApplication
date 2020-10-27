import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { SessionService } from "../services/session/session.service";
import { Location } from "@angular/common";
import { TouchIdService } from "../services/touch/touch-id.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private _sesion: SessionService, private _loc: Location) {}

  canActivate(): boolean {
    //console.log('revisando-..');
    //console.log(this._loc.path())
    if (this._loc.path() == "login" || this._loc.path() == "") {
      debugger;
      if (
       ( this._sesion.GetThirdPartie() == null ||
        this._sesion.GetThirdPartie() == undefined) && (!this._sesion.isUser())
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      //console.log(this._sesion.GetThirdPartie())
      if (
        (this._sesion.GetThirdPartie() == null ||
        this._sesion.GetThirdPartie() == undefined)  && (!this._sesion.isUser())
      ) {
        if (this._loc.path() == "/tabs/settings") return true;
        return false;
      } else {
        return true;
      }
    }
  }
}

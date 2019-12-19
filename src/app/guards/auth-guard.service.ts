import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _sesion:SessionService) { }


  canActivate(): boolean {
    console.log('revisando-..');
    return this._sesion.GetThirdPartie()==null || this._sesion.GetThirdPartie()==undefined;
  }
}

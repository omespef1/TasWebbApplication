import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/session/session.service";
import { Location } from "@angular/common";
import { AlertService } from "../services/alert/alert.service";
@Injectable({
  providedIn: "root",
})
export class RolesGuard   {
  SUPERVISOR: string[] = [
    "enlistment",
    "last-enlistments",
    "pendings",
    "settings",
    "third-partie-validation",
    "third-parties",
    "vehicle",
  ];
  CONDUCTOR: string[] = [
    "enlistment",
    "fueqs",
    "last-enlistments",
    "pendings",
    "settings",
    "third-partie-validation",
    "third-parties",
    "vehicle",
    ""
  ];
  CLIENTE: string[] = ["programming", "programming-detail"];
  constructor(
    private _sesion: SessionService,
    private _loc: Location,
    private _alert: AlertService
  ) {}

  // canActivate(): boolean {
  //   const location = this._loc.
  
    // Si es usuario
    // if (
    //   this._sesion.GetUser() != null &&
    //   this._sesion.GetUser() !== undefined
    // ) {
      // const grupo = this._sesion.GetUser().Grupo;
      // switch (grupo) {
      //   case "SUPERVISOR":
      //     if (this.SUPERVISOR.indexOf(location) > -1) {
      //       return true;
      //     }
      //     this.noAccess();
      //     return false;
      //   case "CLIENTE":
      //     if (this.CLIENTE.indexOf(location) > -1) {
      //       return true;
      //     }
      //     this.noAccess();
      //     return false;

      //   case "CONDUCTOR":
      //     if (this.CONDUCTOR.indexOf(location) > -1) {
      //       return true;
      //     }
      //     this.noAccess();
      //     return false;
      // }
    // }
    //Si es conductor
    // else {
    //   if (this.CONDUCTOR.indexOf(location) > -1) {
    //     return true;
    //   }
    //   this.noAccess();
    //   return false;
    // }
  // }

  noAccess(){
    this._alert.showAlert(
      "Acceso no autorizado",
      "Sus privilegios no le permiten ingresar a esta sección"
    );

  }
}

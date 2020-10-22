import { Injectable } from '@angular/core';
import { HttpManagerService } from "../httpManager/http-manager.service";
import { OneSignalEntitie } from "src/app/models/one-signal-third-parties/one-signal-third-parties";
import { transaction } from '../../models/general/transaction';



@Injectable({
  providedIn: 'root'
})
export class OneSignalUsersService {

  constructor(private _http:HttpManagerService) { }


  PostOneSignalUser(user: OneSignalEntitie){
    return this._http.Post<transaction>(`/UsuariosOneSignal/PostGENUsuariosOneSignal`,user);
  }
}

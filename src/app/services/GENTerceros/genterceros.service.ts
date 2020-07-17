import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from "src/app/models/general/transaction";

@Injectable({
  providedIn: 'root'
})
export class GENTercerosService {

  constructor(private _http:HttpManagerService) { }


  GetGENTerceros(idEmpresa: number){
    return this._http.Get<transaction>(`/GENTerceros?IdEmpresa=${idEmpresa}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction, transactionObj } from "src/app/models/general/transaction";
import { vehicle } from '../../models/vehicle/vehicle';

@Injectable({
  providedIn: 'root'
})
export class GENTercerosService {

  constructor(private _http:HttpManagerService) { }


  GetGENTerceros(idEmpresa: number){
    return this._http.Get<transaction>(`/GENTerceros?IdEmpresa=${idEmpresa}`);
  }
  GetGENTercerosBank(idEmpresa: number){
    return this._http.Get<transaction>(`/GENTerceros/bank?IdEmpresa=${idEmpresa}`);
  }
  GetFuecThirdPartie(idEmpresa:number,thirdPartieId:number){
    return this._http.Get<transaction>(`/GENTerceros/GetFuecThirdPartie?companyId=${idEmpresa}&thirdPartieId=${thirdPartieId}`);
  }

  IsAuthorizedForService(idEmpresa:number,thirdPartieId:number){
    return this._http.Get<transactionObj<vehicle>>(`/GENTerceros/isAuthorizedForService?companyCode=${idEmpresa}&thirdPartieId=${thirdPartieId}`);
  }
}

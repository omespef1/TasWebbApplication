import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction, transactionObj } from "src/app/models/general/transaction";
import { vehicle } from '../../models/vehicle/vehicle';
import { manchecklist } from '../../models/enlistmen/manchecklist';
import { ThirdPartie } from '../../models/general/user';

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

  GetLastEnlistmentThirdPartieApproved(idEmpresa:number,thirdPartieId:number){
    return this._http.Get<transactionObj<manchecklist>>(`/GENTerceros/GetLastEnlistmentThirdPartieApproved?companyCode=${idEmpresa}&thirdPartieId=${thirdPartieId}`);
  }


  GetById(idEmpresa:number,thirdPartieId:number){
    return this._http.Get<transactionObj<ThirdPartie>>(`/GENTerceros/GetById?companyCode=${idEmpresa}&id=${thirdPartieId}`);
  }
}

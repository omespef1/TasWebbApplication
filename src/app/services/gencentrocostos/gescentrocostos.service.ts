import { Injectable } from '@angular/core';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { GESCentroCostos } from 'src/app/models/service-request/costcenter';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GescentrocostosService {

  constructor(private _http:HttpManagerService) { }




  GetCostCenterCompany(idEmpresa:number){
    return this._http.Get<transactionObj<GESCentroCostos[]>>(`/GESCentroCostos/GetByCompany?companyCode=${idEmpresa}`);
  }
}

import { Injectable } from '@angular/core';
import { transaction } from 'src/app/models/general/transaction';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GescentrocostosService {

  constructor(private _http:HttpManagerService) { }




  GetCostCenterCompany(idEmpresa:number,text:string){
    return this._http.Get<transaction>(`/GESCentroCostos/GetByCompany?companyCode=${idEmpresa}&searchTerm=${text}`);
  }
}

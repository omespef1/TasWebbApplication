import { Injectable } from '@angular/core';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { GESCentroCostos } from 'src/app/models/service-request/costcenter';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { GESContratos } from '../../models/contracts/contract.model';

@Injectable({
  providedIn: 'root'
})
export class GesContratosService {

  constructor(private _http:HttpManagerService) { }




  Get(idEmpresa:number){
    return this._http.Get<transactionObj<GESContratos[]>>(`/GetGESContratosClientVip?companyCode=${idEmpresa}`);
  }

  getByCode(companyCode:number, contratoId:number){
    return this._http.Get<transactionObj<GESContratos>>(`/GESContratos/GetByCode?companyCode=${companyCode}&contratoId=${contratoId}`);
  }
  
}

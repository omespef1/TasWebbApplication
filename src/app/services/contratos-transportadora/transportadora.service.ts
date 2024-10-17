import { Injectable } from '@angular/core';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { GESCentroCostos } from 'src/app/models/service-request/costcenter';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { GESContratos } from '../../models/contracts/contract.model';
import { GENContratosTransportadora } from 'src/app/models/transportadora/contratos-transportadora.model';

@Injectable({
  providedIn: 'root'
})
export class GENContratosTransportadoraService {

  constructor(private _http:HttpManagerService) { }




  getGENContratosTransportadora(idEmpresa:number,idTransportadora:number){
    return this._http.Get<transactionObj<GENContratosTransportadora>>(`/GENContratosTransportadoras?companyId=${idEmpresa}&transportadoraId=${idTransportadora}`);
  }


  
}

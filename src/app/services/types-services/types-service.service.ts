import { Injectable } from '@angular/core';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { GESCentroCostos } from 'src/app/models/service-request/costcenter';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { TypesService } from '../../models/types-services/type-services';

@Injectable({
  providedIn: 'root'
})
export class TypesServicesService {

  constructor(private _http:HttpManagerService) { }




  Get(idEmpresa:number){
    return this._http.Get<transactionObj<TypesService[]>>(`/GESTiposServicios?companyCode=${idEmpresa}`);
  }

  GetByContract(idEmpresa:number,contractId:number){
    return this._http.Get<transactionObj<TypesService[]>>(`/GESTiposServicios/GetByContract?companyCode=${idEmpresa}&contractId=${contractId}`);
  }
}

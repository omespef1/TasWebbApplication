import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transaction, transactionObj } from '../../models/general/transaction';
import { TypeContract } from 'src/app/models/ocasional/type-contract';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  constructor(private http:HttpManagerService) { }


  GetTypeContracts(idEmpresa: number){
    return this.http.Get<transactionObj<TypeContract[]>>(`/GESTipoContrato?companyId=${idEmpresa}`);
  }
  getTypeContractsById(idEmpresa: number,id:number){
    return this.http.Get<transactionObj<TypeContract>>(`/GESTipoContrato/id?id=${id}&companyId=${idEmpresa}`);
  }
}

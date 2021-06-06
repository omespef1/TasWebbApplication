import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transaction, transactionObj } from '../../models/general/transaction';
import { TypeContract } from 'src/app/models/ocasional/type-contract';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  constructor(private http:HttpClient) { }


  GetTypeContracts(idEmpresa: number){
    return this.http.get<transactionObj<TypeContract[]>>(`/GESTipoContrato?companyId=${idEmpresa}`);
  }
}

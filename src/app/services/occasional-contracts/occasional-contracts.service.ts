import { Injectable } from '@angular/core';
import { OcasionalContract } from '../../models/ocasional/ocasional-contract';
import { transactionObj } from '../../models/general/transaction';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class OccasionalContractsService {

  constructor(private http:HttpManagerService) { }


    
  getOcasionalContracts(companyId:number,documentNumber:string){
    return this.http.Get<transactionObj<OcasionalContract>>(`/GESContratosOcasionales/GetByDocument?companyId=${companyId}&documentNumber=${documentNumber}`);
  }
}

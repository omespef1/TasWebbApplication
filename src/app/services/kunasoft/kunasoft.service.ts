import { stringify } from 'querystring';
import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { KunasofResponse } from 'src/app/models/kunasot/infokunasoft.model';

@Injectable({
    providedIn: "root"
  })
export class KunasoftService {

constructor(private http:HttpManagerService){


}
 
getKilometraje(companyId:number, placa:string){
    return this.http.Get<transactionObj<KunasofResponse>>(`/Kilometraje/GetKilometraje?companyId=${companyId}&placa=${placa}`)
}

    
}
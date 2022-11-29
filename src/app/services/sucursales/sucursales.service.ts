import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { GESSucursales } from '../../models/gessucursales/gessucursal.model';


@Injectable({
    providedIn: "root"
  })
export class GESSucursalesService {

constructor(private http:HttpManagerService){


}


get(clientId:number,companyId:number){

    return this.http.Get<transactionObj<GESSucursales[]>>(`/GESSucursales?companyCode=${companyId}&clientId=${clientId}`)
}


    
}
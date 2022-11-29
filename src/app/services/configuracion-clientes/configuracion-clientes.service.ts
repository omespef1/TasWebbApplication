import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { ConfiguracionClientes } from 'src/app/models/configuracion-clientes/configuracion-clientes.model';

@Injectable({
    providedIn: "root"
  })
export class ConfiguracionClientesService {

constructor(private http:HttpManagerService){


}


get(companyId:number, clientId:number,idItem:number){

    return this.http.Get<transactionObj<ConfiguracionClientes>>(`/ConfiguracionClientes?companyCode=${companyId}&clientId=${clientId}&idItem=${idItem}`)
}

    
}
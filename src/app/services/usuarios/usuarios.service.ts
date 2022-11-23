import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { Usuario } from '../../models/usuarios/user.model';

@Injectable({
    providedIn: "root"
  })
export class UsuariosService {

constructor(private http:HttpManagerService){


}


get(username:string,companyId:number){
  debugger;
    return this.http.Get<transactionObj<Usuario>>(`/Usuarios/getuser?username=${username}&companyCode=${companyId}`)
}

set(data:any){
 return this.http.Post<transaction>(`/Usuarios`,data);
}
    
}
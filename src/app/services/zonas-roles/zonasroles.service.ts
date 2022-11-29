import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { Usuario } from '../../models/usuarios/user.model';
import { ThirdPartie } from '../../models/general/user';

@Injectable({
    providedIn: "root"
  })
export class ZonasRolesService {

constructor(private http:HttpManagerService){


}


get(companyId:number){

    return this.http.Get<transactionObj<ThirdPartie>>(`/ZonasRoles/GetRoleVip?companyCode=${companyId}`)
}


    
}
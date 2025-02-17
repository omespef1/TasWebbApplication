import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { GesRutas } from 'src/app/models/gesrutas/gesturas.model';

@Injectable({
    providedIn: "root"
  })
export class GESRutasService {

constructor(private http:HttpManagerService){


}


getRoutes(companyId:number,contractId:number){
    return this.http.Get<transactionObj<GesRutas[]>>(`/GESRutasByContract?companyId=${companyId}&contratoId=${contractId}`)
}


    
}
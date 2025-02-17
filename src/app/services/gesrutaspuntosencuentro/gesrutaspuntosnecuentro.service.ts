import { Injectable, OnInit } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {   transactionObj } from '../../models/general/transaction';
import {  GESRutasPuntosEncuentro } from 'src/app/models/gesrutas/gesturas.model';

@Injectable({
    providedIn: "root"
  })
export class GESRutasPuntosEncuentroService  {

constructor(private http:HttpManagerService){
    


}


getPoints(companyId:number,routeCode:number){
    return this.http.Get<transactionObj<GESRutasPuntosEncuentro[]>>(`/GESRutasPuntosEncuentroes?companyId=${companyId}&routeCode=${routeCode}`)
}
    
}
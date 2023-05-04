import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { GENPasajeros } from 'src/app/models/genpasajeros/genpasajeros.model';

@Injectable({
    providedIn: "root"
  })
export class GENPasajerosService {

constructor(private http:HttpManagerService){


}


getPassengers(idPasenger:number){
    return this.http.Get<transactionObj<GENPasajeros>>(`/GENPasajeros/GetById?passengerId=${idPasenger}`)
}


    
}
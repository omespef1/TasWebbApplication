import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';

@Injectable({
    providedIn: "root"
  })
export class PassengerService {

constructor(private http:HttpManagerService){


}

checkPassenger(companyId:number, requestId:number,  identification:string){


    return this.http.Get<transactionObj<Boolean>>(`/GESVinculacionRutasDes/IsPassengerInRoute?identification=${identification}&companyId=${companyId}&requestId=${requestId}`)
}

getPassengers(companyId:number, requestId:number){
    return this.http.Get<transactionObj<any[]>>(`/GESSolicitudServiciosPasajeros?companyId=${companyId}&requestId=${requestId}`)
}

setPassenger(passneger:any){
 return this.http.Post<transaction>(`/GESSolicitudServiciosPasajeros`,passneger);
}
    
}
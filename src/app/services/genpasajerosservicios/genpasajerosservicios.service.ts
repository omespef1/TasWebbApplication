import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';
import { SessionService } from '../session/session.service';
const API_CONTROLLER = 'GENPasajerosServicios';
@Injectable({
  providedIn: 'root'
})
export class GENPasajerosServiciosService {


    
  constructor(private _http:HttpManagerService,private _sesion:SessionService)
   {
    
   }


  GetById(id:number){
    //console.log('consultando pasajeros app...')
   return this._http.Get<transaction>(`/${API_CONTROLLER}/GENPasajerosServiciosById?id=${id}`)
  }

  setPassengerServiceLocation(data:any){
    return this._http.Post<transaction>(`/${API_CONTROLLER}/UpdatePassengerLocation`,data);
   }
   update(data:any){
    return this._http.Post<transaction>(`/${API_CONTROLLER}/UpdatePassengers`,data);
   }
}

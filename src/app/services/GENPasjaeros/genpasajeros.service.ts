import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';
import { SessionService } from '../session/session.service';
const API_CONTROLLER = 'GENPasajeros';
@Injectable({
  providedIn: 'root'
})
export class GENPasajerosService {


    
  constructor(private _http:HttpManagerService,private _sesion:SessionService)
   {
    
   }


  GetInfoPassengerByService(companyCode:number, requestId:number){
    //console.log('consultando pasajeros app...')
   return this._http.Get<transaction>(`/${API_CONTROLLER}/GetAllByService?companyCode=${companyCode }&requestId=${requestId }`)
  }

  
}

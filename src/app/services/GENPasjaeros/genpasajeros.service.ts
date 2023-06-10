import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';
import { SessionService } from '../session/session.service';
import { business } from '../../models/business/business';
import { ThirdPartie } from '../../models/general/user';
import { vehicle } from '../../models/vehicle/vehicle';
import { transactionObj } from '../../models/general/transaction';

@Injectable({
  providedIn: 'root'
})
const API_CONTROLLER = 'GENPasajeros';
export class GENPasajerosService {


    
  constructor(private _http:HttpManagerService,private _sesion:SessionService)
   {
    
   }


  GetInfoPassengerByService(companyCode:number, requestId:number){
    //console.log('consultando pasajeros app...')
   return this._http.Get<transaction>(`/${API_CONTROLLER}/GetAllByService?companyCode=${companyCode }&requestId=${requestId }`)
  }

  
}

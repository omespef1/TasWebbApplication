import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';
import { SessionService } from '../session/session.service';
import { business } from '../../models/business/business';
import { ThirdPartie } from '../../models/general/user';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpManagerService,private _sesion:SessionService)
   {
    
   }


  GetVehicleInformation(business:business,ThirdPartie:ThirdPartie){
   return this._http.Get<transaction>(`/Vehicle?business=${ business.CodigoEmpresa}&IdTercero=${ThirdPartie.IdTercero}`)
  }
}

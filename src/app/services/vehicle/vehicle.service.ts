import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';
import { SessionService } from '../session/session.service';
import { business } from '../../models/business/business';
import { ThirdPartie } from '../../models/general/user';
import { vehicle } from '../../models/vehicle/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpManagerService,private _sesion:SessionService)
   {
    
   }


  GetVehicleInformation(business:business,ThirdPartie:ThirdPartie){
    console.log('consultando vehículos...')
   return this._http.Get<transaction>(`/Vehicle?business=${ business.CodigoEmpresa}&IdTercero=${ThirdPartie.IdTercero}`)
  }

  GetDocumentsValidation(business:business,ThirdPartie:ThirdPartie,car:vehicle){
    return this._http.Get<transaction>(`/Vehicle/ValidaDocumentos?business=${ business.CodigoEmpresa}&IdTercero=${ThirdPartie.IdTercero}&identificacion=${ThirdPartie.Identificacion}&idVehiculo=${car.IdVehiculo}`)
  }
  GetManPendientes(business:business,vehicle:vehicle){
    return this._http.Get<transaction>(`/Vehicle/ManPendientes?business=${business.CodigoEmpresa}&idVehiculo=${vehicle.IdVehiculo}`);
  }
  ArmaProtocolo(business:business,vehicle:vehicle,ThirdPartie:ThirdPartie){
    return this._http.Get<transaction>(`/Vehicle/ArmaProtocolo?business=${business.CodigoEmpresa}&idVehiculo=${vehicle.IdVehiculo}&identificacion=${ThirdPartie.Identificacion}`);
  }

  GetLastEnlistment(business: business, ThirdPartie: ThirdPartie) {
    return this._http.Get<transaction>(`/Vehicles/GetLastEnlistment?business=${business.CodigoEmpresa}&IdTercero=${ThirdPartie.IdTercero}`);
  }
}

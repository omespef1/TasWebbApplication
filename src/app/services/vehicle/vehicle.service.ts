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
export class VehicleService {

  constructor(private _http:HttpManagerService,private _sesion:SessionService)
   {
    
   }


  GetVehicleInformation(business:business,ThirdPartie:ThirdPartie){
    //console.log('consultando vehículos...')
   return this._http.Get<transaction>(`/Vehicle?business=${ business.CodigoEmpresa}&IdTercero=${ThirdPartie.IdTercero}`)
  }

  GetVehicleInformationById(companyCode:number,thirdPartieId:number){
    //console.log('consultando vehículos...')
   return this._http.Get<transaction>(`/Vehicle?business=${companyCode}&IdTercero=${thirdPartieId}`)
  }

  GetAllActiveVehicles(companyId:number){
    //console.log('consultando vehículos...')
   return this._http.Get<transaction>(`/Vehicles/GetAllVehicles?companyId=${ companyId}`)
  }
  getMyCar(companyId:number,thirdPartieId:number){
    //console.log('consultando vehículos...')
   return this._http.Get<transactionObj<vehicle>>(`/Vehicles/mycar?companyId=${companyId}&thirdPartieId=${thirdPartieId}`)
  }


  GetDocumentsValidation(business:business,ThirdPartie:ThirdPartie,car:vehicle){
    return this._http.Get<transaction>(`/Vehicle/ValidaDocumentos?business=${ business.CodigoEmpresa}&IdTercero=${ThirdPartie.IdTercero}&identificacion=${ThirdPartie.Identificacion}&idVehiculo=${car.IdVehiculo}`)
  }

  GetDocumentsValidationCompany(companyCode:number){
    return this._http.Get<transaction>(`/Vehicle/ValidaDocumentosCompany?companyCode=${ companyCode}`)
  }

  GetVehicleByCompany(companyCode:number,vehicleId:number){
    return this._http.Get<transactionObj<vehicle>>(`/Vehicles/getVehicle?companyCode=${companyCode}&vehicleId=${vehicleId}`)
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

  GetManCheckListDetalle(idEmpresa:number,idCheckList:number,pNo:string){
    return this._http.Get<transaction>(`/Vehicles/GetCheckListDetalle?IdCheckList=${idCheckList}&IdEmpresa=${idEmpresa}&PNo=${pNo}`);
  }

  GetTypesVehicles(companyCode:number,contratoId:number){
    return this._http.Get<transaction>(`/TRATipoVehiculoes?companyCode=${companyCode}&contratoId=${contratoId}`)
  }
}

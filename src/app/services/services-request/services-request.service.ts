import { Injectable } from '@angular/core';
import { transaction, transactionID } from "src/app/models/general/transaction";
import { HttpManagerService } from '../httpManager/http-manager.service';
import { ServiceRequestDetail } from "src/app/models/service-request/programmings";

@Injectable({
  providedIn: 'root'
})
export class ServicesRequestService {

  constructor(private _http:HttpManagerService) { }


  GetServicesRequest(business: number,thirdPartie: number){
   return this._http.Get<transaction>(`/GESSolicitudServicios?empresaId=${business}&conductorId=${thirdPartie}`);
  }
  GetServicesRequestBeneficiario(business: number,user: string){
    return this._http.Get<transaction>(`/GESSolicitudServiciosClient?empresaId=${business}&usuario=${user}`);
   }
  GetServicesDetail(business: number,id: number){
    return this._http.Get<transaction>(`/GESSolicitudServicios/GetGESSolicitudServiciosDetalle?empresaId=${business}&solicitudId=${id}`);
   }

   PostServicesDetail(request: ServiceRequestDetail){
     return this._http.PostRequest('/GESSolicitudServicios/PostGESSolicitudServiciosDetalle', request);
   }
}

import { Injectable } from '@angular/core';
import { transaction, transactionID } from "src/app/models/general/transaction";
import { HttpManagerService } from '../httpManager/http-manager.service';
import { ServiceRequestDetail, ServicesRequest } from "src/app/models/service-request/programmings";
import { transactionObj } from '../../models/general/transaction';

@Injectable({
  providedIn: 'root'
})
export class ServicesRequestService {


  

  constructor(private _http:HttpManagerService) { }


  GetServicesRequest(business: number,thirdPartie: number){
   return this._http.Get<transaction>(`/GESSolicitudServicios?empresaId=${business}&conductorId=${thirdPartie}`);
  }
  GetServicesRequestBeneficiario(business: number,idPasajero: number){
    return this._http.Get<transaction>(`/GESSolicitudServiciosClient?empresaId=${business}&idPasajero=${idPasajero}`);
   }
  GetServicesDetail(business: number,id: number){
    return this._http.Get<transaction>(`/GESSolicitudServicios/GetGESSolicitudServiciosDetalle?empresaId=${business}&solicitudId=${id}`);
   }

   CheckPendingServices(business: number,thirdPartieId: number){
    return this._http.Get<transaction>(`/GESSolicitudServicios/checkPendingServices?companyId=${business}&thirdPartieId=${thirdPartieId}`);
   }

   PostServicesDetail(request: ServiceRequestDetail){
     return this._http.PostRequest('/GESSolicitudServicios/PostGESSolicitudServiciosDetalle', request);
   }

   PostServiceApp(request: ServicesRequest){
    return this._http.PostRequest<transaction>('/GESSolicitudServicios/newServiceApp', request);
  }
  PostServiceManualService(request: ServicesRequest){
    return this._http.PostRequest<transaction>('/GESSolicitudServicios/setVip', request);
  }

  GetLastsServiceThirdPartieApproved(business: number,id: number){
    return this._http.Get<transactionObj<ServicesRequest>>(`/GESSolicitudServicios/GetLastsServiceThirdPartieApproved?companyCode=${business}&thirdPartie=${id}`);
   }

   CancelService(requestId: number,companyCode: number){
    return this._http.Get<transactionObj<ServicesRequest>>(`/GESSolicitudServicios/cancelServiceApp?requestId=${requestId}&companyCode=${companyCode}`);
   }


}

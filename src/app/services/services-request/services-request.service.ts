import { Injectable } from '@angular/core';
import { transaction, transactionID } from "src/app/models/general/transaction";
import { HttpManagerService } from '../httpManager/http-manager.service';
import { ServiceRequestDetail, ServicesRequest } from "src/app/models/service-request/programmings";
import { transactionObj } from '../../models/general/transaction';
import { DtoPointControl } from 'src/app/models/gessolicitudpuntoscontrol/gessolicitudpuntoscontrol.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesRequestService {




  constructor(private _http: HttpManagerService) { }


  GetServicesRequest(business: number, thirdPartie: number) {
    return this._http.Get<transaction>(`/GESSolicitudServicios?empresaId=${business}&conductorId=${thirdPartie}`);
  }


  GetServicesRequestRoutes(business: number, passengerId: number) {
    return this._http.Get<transaction>(`/GESSolicitudServicios/routes?empresaId=${business}&passengerId=${passengerId}  `);
  }
  GetServicesRequestBeneficiario(business: number, idPasajero: number) {
    return this._http.Get<transaction>(`/GESSolicitudServiciosClient?empresaId=${business}&idPasajero=${idPasajero}`);
  }
  GetServicesDetail(business: number, id: number) {
    return this._http.Get<transaction>(`/GESSolicitudServicios/GetGESSolicitudServiciosDetalleNew?empresaId=${business}&solicitudId=${id}`);
  }
  GetServicesByVinculationId(business: number, id: string) {
    return this._http.Get<transaction>(`/GESSolicitudServicios/GetServicesByVinculationId?empresaId=${business}&vinculationId=${id}`);
  }
  GetNearestService(business: number, idPassenger: number) {
    return this._http.Get<transaction>(`/GESSolicitudServicios/GetNearestServiceByGesPassenger?empresaId=${business}&idPassenger=${idPassenger}`);
  }

  CheckPendingServices(business: number, thirdPartieId: number) {
    return this._http.Get<transaction>(`/GESSolicitudServicios/checkPendingServices?companyId=${business}&thirdPartieId=${thirdPartieId}`);
  }

  PostServicesDetail(request: ServiceRequestDetail) {
    return this._http.PostRequest('/GESSolicitudServicios/PostGESSolicitudServiciosDetalle', request);
  }
  PostServicesDetailNoInteraccion(request: ServiceRequestDetail) {
    return this._http.PostRequest('/GESSolicitudServicios/PostGESSolicitudServiciosDetalleNoInteraccion', request);
  }
  PostServiceApp(request: ServicesRequest) {
    return this._http.PostRequest<transaction>('/GESSolicitudServicios/newServiceApp', request);
  }

  ChagueTarget(requestId: number, requestTargetId: number, requestTargetAddres: string, companyId: number, Observations: string) {
    return this._http.PostRequest<transaction>('/GESSolicitudServicios/updateTarget', {

      IdTarget: requestTargetId,
      CompanyId: companyId,
      RequestId: requestId,
      Address: requestTargetAddres,
      Observations: Observations
    });
  }
  PostServiceManualService(request: ServicesRequest) {
    return this._http.PostRequest<transaction>('/GESSolicitudServicios/setVip', request);
  }
  PostCancelServicePassenger(companyId: number, requestId: number, passengerId: number) {
    debugger;
    return this._http.PostRequest<transaction>('/GESSolicitudServiciosPasajeros/deleteApp', {
      Id: requestId,
      CompanyId: companyId,
      IdPassenger: passengerId
    });
  }


  setPassengerRoute(entry: any) {
    return this._http.PostRequest<transaction>('/GESSolicitudServiciosPasajeros/setPasssengerRoute', entry);

  }

  GetLastsServiceThirdPartieApproved(business: number, id: number) {
    return this._http.Get<transactionObj<ServicesRequest>>(`/GESSolicitudServicios/GetLastsServiceThirdPartieApproved?companyCode=${business}&thirdPartie=${id}`);
  }

  CancelService(requestId: number, companyCode: number) {
    return this._http.Get<transactionObj<ServicesRequest>>(`/GESSolicitudServicios/cancelServiceApp?requestId=${requestId}&companyCode=${companyCode}`);
  }

  signUpPassenger(requestId: number, companyCode: number, passengerId: number) {
    return this._http.Get<transactionObj<ServicesRequest>>(`/GESSolicitudServicios/signUpPassenger?requestId=${requestId}&empresaId=${companyCode}&passengerId=${passengerId}`);
  }


  updateDriver(companyCode: number, driverId: number, requestId: number) {
    return this._http.Get<transactionObj<any>>(`/GESSolicitudServicios/updateDriver?companyCode=${companyCode}&driverId=${driverId}&requestId=${requestId}`);
  }


  getPointsControl(companyCode: number, requestId: number) {

    return this._http.Get<transaction>(`/GESSolicitudServicios/GESSolicitudServiciosPuntosControlsApp?companyCode=${companyCode}&solicitudId=${requestId}`)
  }


  postPointControl(request: DtoPointControl) {
    return this._http.PostRequest<transaction>('/GESSolicitudServicios/GESSolicitudServiciosPuntosControlsApp', request);
  }


}

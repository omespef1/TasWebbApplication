import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { SessionService } from '../session/session.service';
import { Reporte } from 'src/app/models/monitoreo/reporte';
const API_CONTROLLER = 'GpsMonitoreo';
@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {


    
  constructor(private _http:HttpManagerService)
   {
    
   }


  GetLastPosition(vehicleId:number,company:number){
    //console.log('consultando pasajeros app...')
   return this._http.Get<transactionObj<Reporte>>(`/${API_CONTROLLER}/getLatPosition?vehicleId=${vehicleId}&company=${company}`)
  }

}

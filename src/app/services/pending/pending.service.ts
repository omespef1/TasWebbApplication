import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from '../../models/general/transaction';
import { pending } from '../../models/vehicle/pending';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(private _http:HttpManagerService) { }


  GetManPendientes(business: number,idVehiculo: number){
    this._http.Get<transaction>(`api/Vehicle/ManPendientes?business=${business}&idVehiculo=${idVehiculo}`);
  }

  UpdatePendings(pending:pending[]){
    return this._http.Post<transaction>(`/Vehicle/UpdatePendings`,pending);
  }

}

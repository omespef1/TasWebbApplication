import { Injectable } from '@angular/core';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { DriverInfoFormat } from 'src/app/models/format-in/format-in.model';

@Injectable({
  providedIn: 'root'
})
export class ManFormatoIngresoService {
   private readonly CONTROLLER = 'MANFormatoIngresoTallers';

  
  constructor(private _http:HttpManagerService) { }




  GetDriverInfo(idEmpresa:number,idFormat:number){
    return this._http.Get<transactionObj<DriverInfoFormat>>(`/${this.CONTROLLER}/GetDriverInfo?companyCode=${idEmpresa}&idFormat=${idFormat}`);
  }


  setManFormatoSign(data){
    return this._http.Post<transaction>(`/${this.CONTROLLER}/setSign`, data);
  }

}

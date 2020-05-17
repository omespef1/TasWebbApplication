import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';

@Injectable({
  providedIn: 'root'
})
export class FueqService {

  constructor(private _http:HttpManagerService) { }


  GetFueqs(EmpresaId:number,ConductorId1:number){
   return this._http.Get<transaction>(`/fueq?EmpresaId=${EmpresaId}&ConductorId1=${ConductorId1}`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transaction, transactionObj } from '../../models/general/transaction';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { OcasionalRute } from 'src/app/models/ocasional/rutes';

@Injectable({
  providedIn: 'root'
})
export class OccasionalRoutesService {

  constructor(private http:HttpManagerService) { }


  GetOccasionalRoutes(idEmpresa: number){
    return this.http.Get<transactionObj<OcasionalRute[]>>(`/GESRutas?companyId=${idEmpresa}`);
  }
}

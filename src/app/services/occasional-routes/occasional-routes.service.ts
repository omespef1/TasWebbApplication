import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transaction } from '../../models/general/transaction';

@Injectable({
  providedIn: 'root'
})
export class OccasionalRoutesService {

  constructor(private http:HttpClient) { }


  GetOccasionalRoutes(idEmpresa: number){
    return this.http.get<transaction>(`/GESRutas?compnayId=${idEmpresa}`);
  }
}

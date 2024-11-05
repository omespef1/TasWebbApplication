import { DivisionPoliticaEmpresas } from './../../models/genpasajeros/genpasajeros.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transactionObj } from '../../models/general/transaction';
import { DivisionPolitical } from '../../models/general/political-division';
import { HttpManagerService } from '../httpManager/http-manager.service';


@Injectable({
  providedIn: 'root'
})
export class PoliticalDivisionService {

  constructor(private http:HttpManagerService) { }


  
  GetPoliticalDivision(filter:string){
    return this.http.Get<transactionObj<DivisionPolitical[]>>(`/GENDivisionPoliticas?filter=${filter}`);
  }
  GetPoliticalDivisionByID(idCity:number){
    return this.http.Get<transactionObj<DivisionPolitical>>(`/GENDivisionPoliticas/id?id=${idCity}`);
  }

  GetPoliticalDivisionAll(countryCode:number){
    return this.http.Get<transactionObj<DivisionPolitical>>(`/GenDivisionPolitica/Get?countryCode=${countryCode}`);
  }
  GetPoliticalDivisionAllActive(countryCode:number){
    return this.http.Get<transactionObj<DivisionPolitical[]>>(`/GenDivisionPolitica/GetActive?countryCode=${1}`);
  }

  GetPoliticalDivisionAllActiveNew(){
    return this.http.Get<transactionObj<DivisionPoliticaEmpresas[]>>(`/DivisionPoliticaEmpresas/Get`);
  }
}

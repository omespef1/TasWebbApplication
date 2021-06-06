import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transactionObj } from '../../models/general/transaction';
import { DivisionPolitical } from '../../models/general/political-division';


@Injectable({
  providedIn: 'root'
})
export class PoliticalDivisionService {

  constructor(private http:HttpClient) { }


  
  GetPoliticalDivision(){
    return this.http.get<transactionObj<DivisionPolitical[]>>(`/GENDivisionPoliticas`);
  }
}

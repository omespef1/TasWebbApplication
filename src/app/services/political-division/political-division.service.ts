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
  GetPoliticalDivisionByID(id:number){
    return this.http.Get<transactionObj<DivisionPolitical>>(`/GENDivisionPoliticas/id?id=${id}`);
  }
}

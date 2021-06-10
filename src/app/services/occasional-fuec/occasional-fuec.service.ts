import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { OcassionalFuec } from '../../models/ocasional/occasional-fuec';
import { transactionObj } from '../../models/general/transaction';

@Injectable({
  providedIn: 'root'
})
export class OccasionalFuecService {

  constructor(private http:HttpManagerService) { }


  setOccasionalFuec(data:OcassionalFuec){
  return  this.http.Post<transactionObj<string>>(`/FUEOcasionals`,data)
  }
}

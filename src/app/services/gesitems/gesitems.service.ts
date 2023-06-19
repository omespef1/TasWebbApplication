import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { GesItems } from 'src/app/models/genitems/gesitems.model';


@Injectable({
    providedIn: "root"
  })
export class GesItemsService {

constructor(private http:HttpManagerService){


}


getByTitem(id:number){
    return this.http.Get<transactionObj<GesItems>>(`/GesItems/GetByTitem?titemId=${id}`)
}


    
}
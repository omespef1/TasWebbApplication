import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import {  transaction, transactionObj } from '../../models/general/transaction';
import { AppVersionControl } from 'src/app/models/appversioncontrol/appversioncontrol.model';


@Injectable({
    providedIn: "root"
  })
export class AppVersionControlService {

constructor(private http:HttpManagerService){


}


checkAppVersion(platform:string){

    return this.http.Get<transactionObj<AppVersionControl>>(`/AppsVersionControls?platform=${platform}`)
}


    
}
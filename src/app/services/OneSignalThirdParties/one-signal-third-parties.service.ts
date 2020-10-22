import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from '../../models/general/transaction';
import { OneSignalEntitie } from '../../models/one-signal-third-parties/one-signal-third-parties';
import { ThirdPartie } from 'src/app/models/general/user';

@Injectable({
  providedIn: 'root'
})
export class OneSignalThirdPartiesService {

  constructor(private _http:HttpManagerService) { }


  PostOneSignalThirdPartie(thirdPartie: OneSignalEntitie){
    return this._http.Post<transaction>(`/GENTercerosOneSignal/PostGENTercerosOneSignal`,ThirdPartie);
  }
}

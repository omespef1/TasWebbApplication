import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';
import { transaction } from 'src/app/models/general/transaction';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http:HttpManagerService) { 



  }


  setCalification(request:any){
    return this.http.PostRequest<transaction>('/GESSolicitudServicios/setCalification', request);
  }
}

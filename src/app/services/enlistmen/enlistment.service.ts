import { Injectable } from '@angular/core';
import { HttpManagerService } from '../httpManager/http-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EnlistmentService {

  constructor(private _http:HttpManagerService) {

   }

   
}

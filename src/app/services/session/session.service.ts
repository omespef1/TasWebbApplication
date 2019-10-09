import { Injectable } from "@angular/core";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor() {}

  SetBusiness(business: business) {
    localStorage.setItem('business', JSON.stringify(business));
  }
  GetBussiness(): business {
    return JSON.parse(localStorage.getItem('business'));
  }
  SetThirdPartie(user: ThirdPartie) {
    localStorage.setItem('thirdPartie', JSON.stringify(user));
  }
  SetThirdPartieBio(user: ThirdPartie) {
    localStorage.setItem('thirdPartieBio', JSON.stringify(user));
  }
  GetThirdPartie(): ThirdPartie {
    return JSON.parse(localStorage.getItem('thirdPartie'));
  }
  GetThirdPartieBio(): ThirdPartie {
    return JSON.parse(localStorage.getItem('thirdPartieBio'));
  }
  SetKilometerCar(kilometer:number){
    localStorage.setItem('kilometer', kilometer.toString());
  }
  SetWifi(val: boolean) {
    localStorage.setItem('wifi', JSON.stringify(val));
  }
  GetWifi() {
    return JSON.parse(localStorage.getItem('wifi'));
  }
  SetMobile(val: boolean) {
    localStorage.setItem('mobile', JSON.stringify(val));
  }
  GetMobile() {
    return JSON.parse(localStorage.getItem('mobile'));
  }
  removeUser(){
    localStorage.clear();
  }
}

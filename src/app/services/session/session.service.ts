import { Injectable } from "@angular/core";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";
import { ToastController } from "@ionic/angular";
import { stringify } from "querystring";
import { vehicle } from "src/app/models/vehicle/vehicle";
import { enlistment } from "src/app/models/enlistmen/enlistmen";
import { manchecklist } from "src/app/models/enlistmen/manchecklist";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor() {}

  SetBusiness(business: business) {
    localStorage.setItem("business", JSON.stringify(business));
  }
  GetBussiness(): business {
    return JSON.parse(localStorage.getItem("business"));
  }
  SetThirdPartie(user: ThirdPartie) {
    localStorage.setItem("thirdPartie", JSON.stringify(user));
  }
  SetThirdPartieBio(user: ThirdPartie) {
    localStorage.setItem("thirdPartieBio", JSON.stringify(user));
  }
  GetThirdPartie(): ThirdPartie {
    return JSON.parse(localStorage.getItem("thirdPartie"));
  }
  GetThirdPartieBio(): ThirdPartie {
    return JSON.parse(localStorage.getItem("thirdPartieBio"));
  }
  SetKilometerCar(kilometer: number) {
    localStorage.setItem("kilometer", kilometer.toString());
  }
  SetWifi(val: boolean) {
    localStorage.setItem("wifi", JSON.stringify(val));
  }
  GetWifi() {
    return JSON.parse(localStorage.getItem("wifi"));
  }
  SetMobile(val: boolean) {
    localStorage.setItem("mobile", JSON.stringify(val));
  }
  GetMobile() {
    return JSON.parse(localStorage.getItem("mobile"));
  }
  removeUser() {
    localStorage.clear();
  }

  SetVehicles(vehicles: vehicle[]) {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }
  GetVehicles(): vehicle[] {
    return JSON.parse(localStorage.getItem("vehicles"));
  }

  SetQuestions(questions: enlistment[]) {
    localStorage.setItem("questions", JSON.stringify(questions));
  }
  GetQuestions(): enlistment[] {
    return JSON.parse(localStorage.getItem("questions"));
  }

  GetNewOfflineEnlistment(): manchecklist[] {
    return JSON.parse(localStorage.getItem("offlineEnlistments"));
  }
  SetNewOfflineEnlistment(newOfflineEnlistment: manchecklist[]) {
    localStorage.setItem("offlineEnlistments", JSON.stringify(newOfflineEnlistment));
  }

  SetLastEnlistment(answer:manchecklist){
    localStorage.setItem("LastEnlistment", JSON.stringify(answer));
  }

  GetLastEnlistment(): manchecklist {
    return JSON.parse(localStorage.getItem("LastEnlistment"));
  }


}

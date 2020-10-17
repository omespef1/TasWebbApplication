import { Injectable } from "@angular/core";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";
import { ToastController } from "@ionic/angular";
import { stringify } from "querystring";
import { vehicle } from "src/app/models/vehicle/vehicle";
import { enlistment } from "src/app/models/enlistmen/enlistmen";
import { manchecklist } from "src/app/models/enlistmen/manchecklist";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  constructor(private _storage: Storage) {}

  SetBusiness(business: business) {
    localStorage.setItem("business", JSON.stringify(business));
  }
  GetBussiness(): business {
    return JSON.parse(localStorage.getItem("business"));
  }
  SetThirdPartie(user: ThirdPartie) {
    localStorage.setItem("thirdPartie", JSON.stringify(user));
  }
  SetUserBio(user: ThirdPartie) {
    localStorage.setItem("userBio", JSON.stringify(user));
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
  GetUserBio(): ThirdPartie {
    return JSON.parse(localStorage.getItem("userBio"));
  }
  SetKilometerCar(kilometer: number) {
    localStorage.setItem("kilometer", kilometer.toString());
  }
  SetWifi(val: boolean) {
    localStorage.setItem("wifi", JSON.stringify(val));
  }
  GetWifi(): boolean {
    return JSON.parse(localStorage.getItem("wifi"));
  }
  SetMobile(val: boolean) {
    //console.log('permiso a mobile cambiado');
    localStorage.setItem("mobile", JSON.stringify(val));
  }
  GetMobile(): boolean {
    return JSON.parse(localStorage.getItem("mobile"));
  }

  setGroupEnlistment(val: boolean) {
    localStorage.setItem("GroupEnlistment", JSON.stringify(val));
  }
  getGroupEnlistment(): boolean {
    return JSON.parse(localStorage.getItem("GroupEnlistment"));
  }
  removeThirdPartie() {
    localStorage.removeItem("thirdPartie");
  }

  removeUser() {
    localStorage.removeItem("user");
  }
  setOfflineUser(user) {
    localStorage.setItem("offlineUser", JSON.stringify(user));
  }
  getOfflineUser() {
    return JSON.parse(localStorage.getItem("offlineUser"));
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

  GetNewOfflineEnlistment(): Promise<manchecklist[]> {
    return this._storage.get("offlineEnlistments");
    // return JSON.parse(localStorage.getItem("offlineEnlistments"));
  }
  SetNewOfflineEnlistment(newOfflineEnlistment: manchecklist[]) {
    // localStorage.setItem("offlineEnlistments", JSON.stringify(newOfflineEnlistment));
    return this._storage.set("offlineEnlistments", newOfflineEnlistment);
  }

  SetLastEnlistment(answer: manchecklist): Promise<manchecklist> {
    // localStorage.setItem("LastEnlistment", JSON.stringify(answer));
    return this._storage.set("LastEnlistment", answer);
  }

  removeLastEnlistment() {
    localStorage.removeItem("LastEnlistment");
  }

  GetLastEnlistment(): Promise<manchecklist> {
    // return JSON.parse(localStorage.getItem("LastEnlistment"));
    return this._storage.get("LastEnlistment");
  }

  SetUser(user: ThirdPartie) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  GetUser(): ThirdPartie {
    return JSON.parse(localStorage.getItem("user"));
  }

  isUser(): boolean {
    if (this.GetUser() != null && this.GetUser() !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  setOneSignalIds(value) {
    this._storage.set("oneSignalId", value);
  }

  getOneSignalId() {
    return this._storage.get("oneSignalId");
  }
}

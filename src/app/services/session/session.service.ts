import { Injectable } from "@angular/core";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";

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
  GetThirdPartie(): ThirdPartie {
    return JSON.parse(localStorage.getItem('thirdPartie'));
  }
}

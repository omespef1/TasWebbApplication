import { Injectable } from "@angular/core";
import { HttpManagerService } from "../httpManager/http-manager.service";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";
import { transaction, transactionID } from "../../models/general/transaction";
import { manchecklist } from "../../models/enlistmen/manchecklist";

@Injectable({
  providedIn: "root"
})
export class EnlistmentService {
  constructor(private _http: HttpManagerService) {}
  GetQuestions(business: business, user: ThirdPartie) {
    return this._http.Get<transaction>(
      `/Question?business=${business.CodigoEmpresa}&user=${user.Identificacion}`
    );
  }

  PostAnswer(answers: manchecklist) {
    return this._http.Post<transactionID>("/vehicle", answers);
  }
}

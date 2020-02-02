import { Injectable } from "@angular/core";
import { HttpManagerService } from "../httpManager/http-manager.service";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";
import { transaction, transactionID } from "../../models/general/transaction";
import { manchecklist } from "../../models/enlistmen/manchecklist";
import { SessionService } from "../session/session.service";
import { enlistment } from "../../models/enlistmen/enlistmen";

@Injectable({
  providedIn: "root"
})
export class EnlistmentService {
  constructor(
    private _http: HttpManagerService,
    private _sesion: SessionService
  ) {}
  GetQuestions(business: business, user: ThirdPartie) {
    return this._http.Get<transaction>(
      `/Question?business=${business.CodigoEmpresa}&user=${user.Identificacion}`
    );
  }

  PostAnswer(answers: manchecklist) {
    return this._http.Post<transactionID>("/vehicle", answers);
  }

  CheckEnlistment(enlistment: manchecklist) {
    let answersWaited = this._sesion.GetQuestions();
    enlistment.detalle.forEach(element => {
      const validAnswer = answersWaited.filter(t => t.PNo == element.PNo);
      if(element.Respuesta != validAnswer[0].respuesta && validAnswer[0].Restringe==1) return false;
    });
    return true;
  }
}

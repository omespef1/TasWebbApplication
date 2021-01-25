import { Injectable } from "@angular/core";
import { HttpManagerService } from "../httpManager/http-manager.service";
import { business } from "../../models/business/business";
import { ThirdPartie } from "../../models/general/user";
import { transaction, transactionID } from "../../models/general/transaction";
import { manchecklist } from "../../models/enlistmen/manchecklist";
import { SessionService } from "../session/session.service";
import { enlistment } from "../../models/enlistmen/enlistmen";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from "rxjs/operators";
import { config } from "src/assets/config/settings";

@Injectable({
  providedIn: "root"
})
export class EnlistmentService {
  constructor(
    private _http: HttpManagerService,
    private _sesion: SessionService,
    private http:HttpClient
  ) {}
  GetQuestions(business: business, user: ThirdPartie) {
    return this._http.Get<transaction>(
      `/Question?business=${business.CodigoEmpresa}&user=${user.Identificacion}`
    );
  }

  PostAnswer(answers: manchecklist) {
    // return this._http.Post<    background-color: #F2F2F2;>("/vehicle", answers);
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    let bodyRequest: any = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.post<transactionID>(`${config.url} /vehicle`, answers, bodyRequest as object).pipe(retry(5));
  }

  CheckEnlistment(enlistment: manchecklist) {
    let valid = true;
    let answersWaited = this._sesion.GetQuestions();
    enlistment.detalle.forEach(element => {
      const validAnswer = answersWaited.filter(t => t.PNo == element.PNo);
      if(element.Respuesta != validAnswer[0].respuesta && validAnswer[0].Restringe==1){
        valid = false;
      }
    });
    return valid;
  }
}

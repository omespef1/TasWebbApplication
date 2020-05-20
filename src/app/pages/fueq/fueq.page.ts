import { Component, OnInit } from "@angular/core";
import { fueq } from "src/app/models/fueq/fueq";
import { FueqService } from "src/app/services/fueq/fueq.service";
import { SessionService } from "src/app/services/session/session.service";
import * as moment from "moment";
import { AlertService } from "src/app/services/alert/alert.service";

@Component({
  selector: "app-fueq",
  templateUrl: "./fueq.page.html",
  styleUrls: ["./fueq.page.scss"]
})
export class FueqPage implements OnInit {
  loading = false;
  fueqs: fueq[] = [];
  constructor(
    private _fueq: FueqService,
    private _session: SessionService,
    private _alert: AlertService
  ) {
    

  }

  

  ionViewWillEnter(){
    this.GetFueqs();
  }
   ngOnInit(){

  }
  

  GetFueqs(event?: any) {
    this.loading = true;
    return this._fueq
      .GetFueqs(
        this._session.GetThirdPartie().IdEmpresa,
        this._session.GetThirdPartie().IdTercero
      )
      .subscribe(resp => {
        this.loading = false;
        if (event != null) {
          event.target.complete();
        }
          if (resp != null && resp.Retorno == 0) {
            if(resp.ObjTransaction==null)
            this._alert.presentToast("No se encontraron registros",3000);
            this.fueqs = resp.ObjTransaction;
          }
      
      });
  }

  seeFueq(fuec: fueq) {
    this._alert.openBrowserUrl(
      `https://www.tas.com.co/tasweb/FUEImpFuecApp.aspx?Modo=REP&Emp=${
        this._session.GetThirdPartie().IdEmpresa
      }&Id=${fuec.NumeroFuec}`
    );
  }
}

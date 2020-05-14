import { Component, OnInit } from '@angular/core';
import { fueq } from 'src/app/models/fueq/fueq';
import { FueqService } from 'src/app/services/fueq/fueq.service';
import { SessionService } from 'src/app/services/session/session.service';
import * as moment from "moment";
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-fueq',
  templateUrl: './fueq.page.html',
  styleUrls: ['./fueq.page.scss'],
})
export class FueqPage implements OnInit {


  loading = false;
  fueqs:fueq[]=[];
  constructor(private _fueq:FueqService,private _session:SessionService,private _alert:AlertService) { }

  ngOnInit() {

    this.GetFueqs();
  }

  GetFueqs(){
    this.loading=true;
    let dateInit= Number(moment(new Date()).format("DDMMYYYY"));
    let dateFin= Number(moment(new Date()).format("DDMMYYYY"));
    return this._fueq.GetFueqs(this._session.GetThirdPartie().IdEmpresa,this._session.GetThirdPartie().IdTercero,dateInit,dateFin).subscribe(resp=>{
    this.loading=false;
      if(resp!=null && resp.Retorno==0){

        this.fueqs = resp.ObjTransaction;
      }
    })


  }


  seeFueq(fueq:fueq){
 this._alert.openBrowserUrl(`https://www.tas.com.co/tasweb/FUEImpFuecApp.aspx?Modo=REP&Emp=${this._session.GetThirdPartie().IdEmpresa}&Id=${fueq.NumeroFuec}`)
  }
}

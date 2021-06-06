import { Component, OnInit } from "@angular/core";
import { fueq } from "src/app/models/fueq/fueq";
import { FueqService } from "src/app/services/fueq/fueq.service";
import { SessionService } from "src/app/services/session/session.service";
import * as moment from "moment";
import { AlertService } from "src/app/services/alert/alert.service";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GENTercerosService } from '../../services/GENTerceros/genterceros.service';
import { ThirdPartie } from '../../models/general/user';

@Component({
  selector: "app-fueq",
  templateUrl: "./fueq.page.html",
  styleUrls: ["./fueq.page.scss"]
})
export class FueqPage implements OnInit {
  loading = false;
  fueqs: fueq[] = [];
  chekingThirdPartie=false;
  private thirdPartie:ThirdPartie;

  constructor(
    private _fueq: FueqService,
    private _session: SessionService,
    private _alert: AlertService,
    private _sesion:SessionService,
    private _nav:NavController,
    private thirdPartieService:GENTercerosService,
    private router:Router
  ) {
    this.thirdPartie = this._sesion.GetThirdPartie();

  }

  

  ionViewWillEnter(){
    if(this.validAccess()){
      this.GetFueqs();
    }
   
  }
   ngOnInit(){

  }
  
  validAccess():boolean {
    console.log('valid access');
    if (this._sesion.isUser()) {
      console.log('valid accessssss');
      console.log(this._sesion.GetUser());
      if (this._sesion.GetUser().Grupo !== "SUPERVISOR") {
        this._alert.showAlert("Acceso no autorizado","No se encuentra autorizado para acceder a esta sección");
        if (this._sesion.GetUser().Grupo == "BENEFICIARIO") {
          this._nav.navigateRoot("tabs/programming");
        }
        if (this._sesion.GetUser().Grupo == "CLIENTE") {
          this._nav.navigateRoot("tabs/programming");
        }

        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  
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

    this._alert.presentToast('Si no se visualiza el archivo, por favor verifique en las descargas de su dispositivo',3000);    
    this._alert.openBrowserUrl(
      `https://www.tas.com.co/tasweb/FUEImpFuecApp.aspx?Modo=REP&Emp=${
        this._session.GetThirdPartie().IdEmpresa
      }&Id=${fuec.FuecId}`
    );
  }

  goOcassionalFuec(){

    this.chekingThirdPartie = true;
    this.thirdPartieService.GetFuecThirdPartie(this.thirdPartie.IdEmpresa,this.thirdPartie.IdTercero).subscribe(resp=>{
      this.chekingThirdPartie = false;
      if(resp.Retorno==0 && resp.ObjTransaction!=null){
        this.router.navigateByUrl('tabs/fueqs/occasional-fueq');
      }
      else {
        this._alert.showAlert('Acceso no autorizado','Usted no se encuentra autorizado para realizar fuec ocasional.')
      }
    },err=>{
      this._alert.presentToast('Error validando tercero',3000);
      this.chekingThirdPartie = false;
    })
 
  }


}

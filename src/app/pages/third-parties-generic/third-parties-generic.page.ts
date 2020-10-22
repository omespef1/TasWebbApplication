import { Component, OnInit } from "@angular/core";
import { ThirdPartie } from "src/app/models/general/user";
import { GENTercerosService } from "src/app/services/GENTerceros/genterceros.service";
import { SessionService } from "src/app/services/session/session.service";
import { ModalController, NavController } from '@ionic/angular';
import { transaction } from "src/app/models/general/transaction";

@Component({
  selector: "app-third-parties-generic",
  templateUrl: "./third-parties-generic.page.html",
  styleUrls: ["./third-parties-generic.page.scss"],
})
export class ThirdPartiesGenericPage implements OnInit {
  thirdParties: ThirdPartie[] = [];
  thirdPartiesFilter: ThirdPartie[] = [];
  loading = false;
  constructor(
    private _genTerceros: GENTercerosService,
    private _session: SessionService,
    private _modal: ModalController,
    private _nav:NavController
  ) {}

  ngOnInit() {
    this.GetThirdParties();
  }

  GetThirdParties() {
    this.loading = true;
    const user: ThirdPartie = this._session.GetUser();
    this._genTerceros
      .GetGENTerceros(user.IdEmpresa)
      .subscribe((resp: transaction) => {
        this.loading = false;
        if (resp !== undefined && resp.Retorno === 0) {
          this.thirdParties = resp.ObjTransaction;
          this.thirdPartiesFilter = this.thirdParties;
        }
      });
  }

  setThirdPartie(thirdPartie: ThirdPartie) {
    this._modal.dismiss(thirdPartie);
  }

  filterThirdParties(event: any) {
    this.thirdPartiesFilter = [];
    this.thirdPartiesFilter = this.thirdParties.filter(
      (v) =>
        v.NombreCompleto.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 || v.Identificacion.indexOf(event.target.value) > -1
    );
  }
  closeModal(){
    this._modal.dismiss();
  }
}

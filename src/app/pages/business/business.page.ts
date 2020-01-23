import { Component, OnInit } from "@angular/core";
import { business } from "../../models/business/business";
import { SessionService } from "../../services/session/session.service";
import { HttpManagerService } from "../../services/httpManager/http-manager.service";
import { transaction } from "../../models/general/transaction";
import { ModalController } from "@ionic/angular";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-business",
  templateUrl: "./business.page.html",
  styleUrls: ["./business.page.scss"]
})
export class BusinessPage implements OnInit {
  businessList: business;
  loading=false;
  constructor(
    private _sesion: SessionService,
    private _http: HttpManagerService,
    private _modal: ModalController
  ) {}

  ngOnInit() {
    this.GetBusinessList();
  }

  GetBusinessList() {
    this.loading=true;
    this._http.Get<transaction>("/business").subscribe(resp => {
      this.loading=false;
      console.log(resp);
      if (resp.Retorno === 0) {
        this.businessList = resp.ObjTransaction;
      }
    },err=>{
      this.loading=false;
    });
  }

   async SetBusiness(business: business) {
    await this._modal.dismiss(business);
  }
}

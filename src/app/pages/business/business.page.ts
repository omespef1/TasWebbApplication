import { Component, Input, OnInit } from "@angular/core";
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
   @Input() allowedCompanies: number[] = []; // <-- nuevo input
  businessList: business[]=[];  
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
    this.loading = true;
    this._http.Get<transaction>("/business").subscribe(
      resp => {
        this.loading = false;
        if (resp.Retorno === 0) {
          let data = resp.ObjTransaction;

          // Si hay empresas permitidas, filtrar
          if (this.allowedCompanies && this.allowedCompanies.length > 0) {
            data = data.filter((b: business) => this.allowedCompanies.includes(b.CodigoEmpresa));
          }

          this.businessList = data;
        }
      },
      err => {
        this.loading = false;
      }
    );
  }

   async SetBusiness(business: business) {
    await this._modal.dismiss(business);
  }
}

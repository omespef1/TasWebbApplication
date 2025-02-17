import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { transaction } from 'src/app/models/general/transaction';
import { ThirdPartie } from 'src/app/models/general/user';
import { HttpManagerService } from 'src/app/services/httpManager/http-manager.service';

@Component({
  selector: 'app-bussines-public',
  templateUrl: './bussines-public.page.html',
  styleUrls: ['./bussines-public.page.scss'],
})
export class BussinesPublicPage implements OnInit {


  businessList: ThirdPartie;
  loading = false;
  constructor(
    private _http: HttpManagerService,
    private _modal: ModalController
  ) { }

  ngOnInit() {
    this.GetBusinessList();
  }

  GetBusinessList() {
    this.loading = true;
    this._http.Get<transaction>("/GENTerceros/GetGenTecerosAccess").subscribe(resp => {
      this.loading = false;
      if (resp.Retorno === 0) {
        this.businessList = resp.ObjTransaction;
      }
    }, err => {
      this.loading = false;
    });
  }

  
  async SetBusiness(business: ThirdPartie) {
    await this._modal.dismiss(business);
  }
}

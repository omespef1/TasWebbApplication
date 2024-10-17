import { Component, OnInit } from '@angular/core';
import { DivisionPolitical } from '../../../models/general/political-division';
import { ModalController } from '@ionic/angular';
import { PoliticalDivisionService } from '../../../services/political-division/political-division.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-politica-division-active',
  templateUrl: './politica-division-active.component.html',
  styleUrls: ['./politica-division-active.component.scss'],
})
export class PoliticaDivisionActiveComponent implements OnInit {


  dataList: DivisionPolitical[] = [];
  dataListFilter: DivisionPolitical[] = [];
  contractId:number;

  loading = false;
  constructor(
    private modalController: ModalController,
    private itemsServices: PoliticalDivisionService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   this.getItems();
  }


  async setData(data: DivisionPolitical) {
    await this.modalController.dismiss(data);
  }

  search(event) {

    this.dataListFilter = [];
    this.dataListFilter = this.dataList.filter(
      v =>
        v.DescripcionLarga.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1);

  }


  getItems(){   
    console.log(event);
    this.loading = true;
    this.itemsServices.GetPoliticalDivisionAllActive(this.sesionService.GetGetThirdPartieClient().IdEmpresa).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
        this.dataListFilter = resp.ObjTransaction;
      }
    }, err => {
      this.loading = false;

    })
  }


  async closeModal(){
    await this.modalController.dismiss();
  }
  }

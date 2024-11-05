import { DivisionPoliticaEmpresas } from './../../../models/genpasajeros/genpasajeros.model';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoliticalDivisionService } from '../../../services/political-division/political-division.service';



@Component({
  selector: 'app-politica-division-new',
  templateUrl: './politica-division-new.component.html',
  styleUrls: ['./politica-division-new.component.scss'],
})
export class PoliticaDivisionNewComponent implements OnInit {


  dataList: DivisionPoliticaEmpresas[] = [];
  dataListFilter: DivisionPoliticaEmpresas[] = [];
  contractId:number;

  loading = false;
  constructor(
    private modalController: ModalController,
    private itemsServices: PoliticalDivisionService
  ) { }

  ngOnInit() {
   this.getItems();
  }


  async setData(data: DivisionPoliticaEmpresas) {
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
    this.itemsServices.GetPoliticalDivisionAllActiveNew().subscribe(resp => {
      this.loading = false;     
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

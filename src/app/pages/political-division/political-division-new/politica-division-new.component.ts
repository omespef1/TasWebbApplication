import { DivisionPoliticaEmpresas } from './../../../models/genpasajeros/genpasajeros.model';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoliticalDivisionService } from 'src/app/services/political-division/political-division.service';
import { SessionService } from 'src/app/services/session/session.service';



@Component({
  selector: 'app-political-division',
  templateUrl: './politica-division-new.component.html',
  styleUrls: ['./politica-division-new.component.scss'],
})
export class PoliticaDivisionNewComponent implements OnInit {


  dataList: DivisionPoliticaEmpresas[] = [];
  loading = false;
  constructor(
    private modalController: ModalController,
    private politicalDivisionService: PoliticalDivisionService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   
  }


  async setData(data: DivisionPoliticaEmpresas) {
    await this.modalController.dismiss(data);
  }

  search(event) {


    console.log(event);
    this.loading = true;
    this.politicalDivisionService.GetPoliticalDivisionAllActiveNew(this.sesionService.GetGetThirdPartieClient().IdEmpresa,event.detail.value).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
      }
    }, err => {
      
      console.log(err);

      this.loading = false;

    })
  }

}

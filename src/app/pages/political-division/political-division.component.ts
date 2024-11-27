import { DivisionPoliticaEmpresas } from './../../models/genpasajeros/genpasajeros.model';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from '../../services/session/session.service';
import { PoliticalDivisionService } from '../../services/political-division/political-division.service';
import { DivisionPolitical } from '../../models/general/political-division';

@Component({
  selector: 'app-political-division',
  templateUrl: './political-division.component.html',
  styleUrls: ['./political-division.component.scss'],
})
export class PoliticalDivisionComponent implements OnInit {


  dataList: DivisionPoliticaEmpresas[] = [];
  loading = false;
  constructor(
    private modalController: ModalController,
    private politicalDivisionService: PoliticalDivisionService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   
  }


  async setData(data: DivisionPolitical) {
    await this.modalController.dismiss(data);
  }

  search(event) {


    console.log(event);
    this.loading = true;
    this.politicalDivisionService.GetPoliticalDivisionAllActiveNew(this.sesionService.GetThirdPartie().IdEmpresa, event.detail.value).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
      }
    }, err => {
      
      console.log(err);

      
    
      // if(err.ok == false){
     
      //   this.sesionService.GetPoliticalDivisionOffline().then(data=>{
      //       this.dataList = data.filter(c=>c.DescripcionCorta.toUpperCase().indexOf(event.detail.value.toUpperCase())>-1);
      //     })
      // }

      this.loading = false;

    })
  }

}

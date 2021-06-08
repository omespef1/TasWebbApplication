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


  dataList: DivisionPolitical[] = [];
  loading = false;
  constructor(
    private modalController: ModalController,
    private politicalDivisionService: PoliticalDivisionService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   
  }


  async SetData(data: DivisionPolitical) {
    await this.modalController.dismiss(data);
  }

  search(event) {

  debugger;
    console.log(event);
    this.loading = true;
    this.politicalDivisionService.GetPoliticalDivision(event.value).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
      }
    }, err => {
      this.loading = false;

    })
  }

}

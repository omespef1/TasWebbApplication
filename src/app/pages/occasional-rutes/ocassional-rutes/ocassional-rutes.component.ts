import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OccasionalRoutesService } from 'src/app/services/occasional-routes/occasional-routes.service';
import { OcasionalRute } from '../../../models/ocasional/rutes';
import { ContractTypeService } from '../../../services/contracts-type/contract-type.service';
import { SessionService } from '../../../services/session/session.service';
import { ThirdPartie } from '../../../models/general/user';

@Component({
  selector: 'app-ocassional-rutes',
  templateUrl: './ocassional-rutes.component.html',
  styleUrls: ['./ocassional-rutes.component.scss'],
})
export class OcassionalRutesComponent implements OnInit {


  dataList: OcasionalRute[] = [];
  loading = false;
  thirdPartie: ThirdPartie = new ThirdPartie();
  constructor(
    private modalController: ModalController,
    private occasionalRoutesService: OccasionalRoutesService,
    private sesionService: SessionService,
    private sesion: SessionService
  ) {
    this.thirdPartie = this.sesion.GetThirdPartie();

  }

  ngOnInit() {
    this.GetData();
  }

  GetData() {
    this.loading = true;
    this.occasionalRoutesService.GetOccasionalRoutes(this.thirdPartie.IdEmpresa).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
      }
    }, err => {
      this.loading = false;

    })
  }

  async setData(data: OcasionalRute) {
    await this.modalController.dismiss(data);
  }
  async close() {
    await this.modalController.dismiss();
  }
}

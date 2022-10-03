import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session/session.service';
import { GESCentroCostos } from '../../models/service-request/costcenter';
import { GescentrocostosService } from '../../services/gencentrocostos/gescentrocostos.service';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.page.html',
  styleUrls: ['./cost-center.page.scss'],
})
export class CostCenterPage implements OnInit {


  dataList: GESCentroCostos[] = [];
  loading = false;
  constructor(
    private modalController: ModalController,
    private gesCentroCostosService: GescentrocostosService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   
  }


  async setData(data: GESCentroCostos) {
    await this.modalController.dismiss(data);
  }

  search(event) {


    console.log(event);
    this.loading = true;
    this.gesCentroCostosService.GetCostCenterCompany(this.sesionService.GetThirdPartie().IdEmpresa).subscribe(resp => {
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

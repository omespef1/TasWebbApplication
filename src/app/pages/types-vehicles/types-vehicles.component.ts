import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TRATipoVehiculo } from 'src/app/models/types-vehicle/types-vehicle.model';

import { SessionService } from 'src/app/services/session/session.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-types-vehicles',
  templateUrl: './types-vehicles.component.html',
  styleUrls: ['./types-vehicles.component.scss'],
})
export class TypesVehiclesComponent implements OnInit {


  dataList: TRATipoVehiculo[] = [];
  dataListFilter: TRATipoVehiculo[] = [];
  contractId:number;

  loading = false;
  constructor(
    private modalController: ModalController,
    private itemsServices: VehicleService,
    private sesionService: SessionService,
    private navParams:NavParams
  ) { }

  ngOnInit() {
   this.getItems();
  }


  async setData(data: TRATipoVehiculo) {
    await this.modalController.dismiss(data);
  }

  search(event) {

    this.dataListFilter = [];
    this.dataListFilter = this.dataList.filter(
      v =>
        v.Descripcion.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1);

  }


  getItems(){
    this.contractId = this.navParams.get('ContratoId');
    console.log(event);
    this.loading = true;
    this.itemsServices.GetTypesVehicles(this.sesionService.GetGetThirdPartieClient().IdEmpresa,this.contractId).subscribe(resp => {
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
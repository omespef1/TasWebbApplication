import { Component, OnInit } from '@angular/core';
import { vehicle } from '../../models/vehicle/vehicle';
import { ThirdPartie } from '../../models/general/user';
import { ModalController } from '@ionic/angular';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.scss'],
})
export class AllVehiclesComponent implements OnInit {

  dataList: vehicle[]=[];
  data: vehicle[]=[];
  thirdPartie:ThirdPartie;
  loading=false;
  constructor(  
    private modalController: ModalController,
    private vehiclesService:VehicleService,
    private sesionService:SessionService
  ) {

    this.thirdPartie = this.sesionService.GetThirdPartie();
  }

  ngOnInit() {
    this.GetData();
  }

  GetData() {
    this.loading=true;
    this.vehiclesService.GetAllActiveVehicles(this.thirdPartie.IdEmpresa).subscribe(resp=>{
      this.loading=false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction!=null) {
        this.dataList = resp.ObjTransaction;
        this.data = resp.ObjTransaction;
      }
    },err=> {
      this.loading=false;

    })       
  }

   async setData(vehicle: vehicle) {
    await this.modalController.dismiss(vehicle);
  }

  async close(){
    await this.modalController.dismiss();
  }

  filter(event){
    this.dataList = this.data;
    this.dataList = this.data.filter(
      v =>
        v.PlacaVehiculo.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 ||  v.NumeroInterno.indexOf(
          event.target.value
    ) > -1);
  }

}

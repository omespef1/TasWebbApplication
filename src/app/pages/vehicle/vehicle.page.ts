import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { SessionService } from '../../services/session/session.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { vehicle } from '../../models/vehicle/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  today= new Date();
   thirdPartie:ThirdPartie = new ThirdPartie();
   vehicles:vehicle[]= [];
  constructor( private _sesion:SessionService,private _vehicle:VehicleService) {

    this.thirdPartie = this._sesion.GetThirdPartie();
   
   }

  ngOnInit(){
this.GetVehicleInformation();
  }

  GetVehicleInformation(){
    this._vehicle.GetVehicleInformation(this._sesion.GetBussiness(),this._sesion.GetThirdPartie()).subscribe(resp=>{
      if(resp.Retorno==0){
          this.vehicles = resp.ObjTransaction;
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { SessionService } from '../../services/session/session.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { vehicle } from '../../models/vehicle/vehicle';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  today= new Date();
   thirdPartie:ThirdPartie = new ThirdPartie();
   vehicles:vehicle[]= [];

  constructor( private _sesion:SessionService,private _vehicle:VehicleService,private router:Router,private _alert:AlertService) {

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

  checkVehicle(car:vehicle){
      this._vehicle.GetDocumentsValidation(this._sesion.GetBussiness(),this._sesion.GetThirdPartie(),car).subscribe(resp=>{
        if(resp.Retorno==1)
           this._alert.showAlert('Error',resp.TxtError);
           else{
             this._sesion.SetKilometerCar(car.nuevoKilometraje);
             this.router.navigateByUrl('enlistment');
           }
         

      })
  }



}

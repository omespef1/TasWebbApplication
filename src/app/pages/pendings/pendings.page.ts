import { Component, OnInit } from "@angular/core";
import { pending } from "../../models/vehicle/pending";
import { PendingService } from "../../services/pending/pending.service";
import { Router, NavigationExtras } from '@angular/router';
import { vehicle } from "../../models/vehicle/vehicle";
import { TryCatchStmt } from "@angular/compiler";
import { throwError } from "rxjs";
import { AlertService } from '../../services/alert/alert.service';
import { error } from "util";
import { VehicleService } from "src/app/services/vehicle/vehicle.service";
import { SessionService } from '../../services/session/session.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-pendings",
  templateUrl: "./pendings.page.html",
  styleUrls: ["./pendings.page.scss"]
})
export class PendingsPage implements OnInit {
  pendings: pending[];
  saving: boolean = false;
  car: vehicle;
  constructor(private _service: PendingService, private router: Router,
    private alert:AlertService,private _vehicle:VehicleService,
    private _sesion:SessionService,private _nav:NavController) {}

  ngOnInit() {
    this.car = this.router.getCurrentNavigation().extras.state.car;

    this.pendings = this.router.getCurrentNavigation().extras.state.pendings;
  }

  
 
  Guardar() {
    try {
      this.saving = true;
      if (this.pendings.filter(x => x.Restinge === "S" && x.Resuelto === "N").length> 0) {
      throw new Error("Existen pendientes por resolver de tipo restrictivo.No puedes continuar");        
      }
      this._service.UpdatePendings(this.pendings).subscribe(resp => {
        this.saving = false;
        if (resp.Retorno === 1) {          
         this.alert.showAlert('Error',resp.TxtError);
         return;
        }       
        if(resp.Retorno==0){
          this._vehicle
          .ArmaProtocolo(
            this._sesion.GetBussiness(),
            this.car,
            this._sesion.GetThirdPartie()
          )
          .subscribe(resp => {
            if (resp.Retorno === 1) {
              throw Error(resp.TxtError);
            }
            this._sesion.SetKilometerCar(this.car.NuevoKilometraje);
            let params: NavigationExtras = {
              state: {
                car: this.car
              }
            };
            this.alert.presentToast('Pendientes actualizados',3000);
            this._nav.navigateForward("tabs/vehicle/enlistemnt", params);
          });
         
          
        }
      });
    } catch (err) {
      //console.log(err);
      this.saving=false;
     this.alert.showAlert('Error',err);
    }
  }
}

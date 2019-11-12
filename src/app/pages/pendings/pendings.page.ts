import { Component, OnInit } from "@angular/core";
import { pending } from "../../models/vehicle/pending";
import { PendingService } from "../../services/pending/pending.service";
import { Router, NavigationExtras } from '@angular/router';
import { vehicle } from "../../models/vehicle/vehicle";
import { TryCatchStmt } from "@angular/compiler";
import { throwError } from "rxjs";
import { AlertService } from '../../services/alert/alert.service';
import { error } from "util";

@Component({
  selector: "app-pendings",
  templateUrl: "./pendings.page.html",
  styleUrls: ["./pendings.page.scss"]
})
export class PendingsPage implements OnInit {
  pendings: pending[];
  saving: boolean = false;
  car: vehicle;
  constructor(private _service: PendingService, private router: Router,private alert:AlertService) {}

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
        if (resp.Retorno == 1) {
         throwError(resp.TxtError);
        }       
        let paramsEnlistment:NavigationExtras ={
          state: {
            car:this.car
          }
        };
        this.saving = false;
        this.alert.presentToast('Pendientes actualizados',3000);
        this.router.navigateByUrl("enlistment",paramsEnlistment);
      });
    } catch (err) {

      this.saving=false;
      console.log(err);
     this.alert.showAlert('Error',err);
    }
  }
}

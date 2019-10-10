import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { enlistment } from "../../models/enlistmen/enlistmen";
import { manchecklist } from "src/app/models/enlistmen/manchecklist";
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: "app-last-enlistments",
  templateUrl: "./last-enlistments.page.html",
  styleUrls: ["./last-enlistments.page.scss"]
})
export class LastEnlistmentsPage implements OnInit {
  constructor(private _vehicle: VehicleService,private _sesion:SessionService) {}
  enlistment: manchecklist = new manchecklist();
  ngOnInit() {
    this.GetLastEnlistment();
  }

  GetLastEnlistment() {
    this._vehicle.GetLastEnlistment(this._sesion.GetBussiness(), this._sesion.GetThirdPartie()).subscribe(resp => {
      if (resp.Retorno == 0) {
        this.enlistment = resp.ObjTransaction;
      }
    });
  }
}

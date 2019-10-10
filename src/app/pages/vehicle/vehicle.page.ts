import { Component, OnInit } from "@angular/core";
import { ThirdPartie } from "../../models/general/user";
import { SessionService } from "../../services/session/session.service";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { vehicle } from "../../models/vehicle/vehicle";
import { Router, NavigationExtras } from "@angular/router";
import { AlertService } from "../../services/alert/alert.service";
import { aliparam } from "src/app/models/vehicle/aliparam";
import { async } from "@angular/core/testing";
import { error } from "@angular/compiler/src/util";
import {
  NetworkService,
  ConnectionStatus
} from "src/app/services/network/network.service";

@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.page.html",
  styleUrls: ["./vehicle.page.scss"]
})
export class VehiclePage implements OnInit {
  today = new Date();
  thirdPartie: ThirdPartie = new ThirdPartie();
  vehicles: vehicle[] = [];
  vehiclesFilter: vehicle[] = [];
  loading = false;

  constructor(
    private _sesion: SessionService,
    private _vehicle: VehicleService,
    private router: Router,
    private _alert: AlertService,
    private _network: NetworkService
  ) {
    this.thirdPartie = this._sesion.GetThirdPartie();
  }

  ngOnInit() {
    this.GetVehicleInformation();
  }

  GetVehicleInformation() {
    this.loading = true;

    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this._vehicle
        .GetVehicleInformation(
          this._sesion.GetBussiness(),
          this._sesion.GetThirdPartie()
        )
        .subscribe(resp => {
          if (resp.Retorno == 0) {
            this._sesion.SetVehicles(resp.ObjTransaction);
            this.vehicles = resp.ObjTransaction;
            this.vehiclesFilter = this.vehicles;
            this.loading = false;
          }
        });
    } else {
      this.vehicles = this._sesion.GetVehicles();
      this.vehiclesFilter = this._sesion.GetVehicles();
      this.loading = false;
    }
  }

  checkVehicle(car: vehicle) {
    car.loading = true;
    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      if (car.NuevoKilometraje != null && car.NuevoKilometraje > 0) {
        this._vehicle
          .GetDocumentsValidation(
            this._sesion.GetBussiness(),
            this._sesion.GetThirdPartie(),
            car
          )
          .subscribe(resp => {
            try {
              if (resp.Retorno === 1) {
                throw error(resp.TxtError);
              }
              const paramValid: aliparam = resp.ObjTransaction;
              if (car.NuevoKilometraje < car.Kilometraje) {
                throw error("Kilometraje no puede ser inferior al actual");
              }
              if (
                car.NuevoKilometraje - car.Kilometraje >
                paramValid.Par_TopeKilometraje
              ) {
                throw error(
                  `Nuevo Kilometraje no puede ser superior al tope estipulado: ${paramValid.Par_TopeKilometraje}`
                );
              }
              this._vehicle
                .GetManPendientes(this._sesion.GetBussiness(), car)
                .subscribe(resp => {
                  if (resp.Retorno === 0) {
                    this._vehicle
                      .ArmaProtocolo(
                        this._sesion.GetBussiness(),
                        car,
                        this._sesion.GetThirdPartie()
                      )
                      .subscribe(resp => {
                        if (resp.Retorno === 1) {
                          throw Error(resp.TxtError);
                        }
                        this._sesion.SetKilometerCar(car.NuevoKilometraje);
                        let params: NavigationExtras = {
                          state: {
                            car: car
                          }
                        };
                        car.loading = false;
                        this.router.navigateByUrl("enlistment", params);
                      });
                  }
                });
            } catch (err) {
              console.log(err);
              car.loading = false;
              this._alert.showAlert("error", err);
            }
          });
      } else {
        car.loading = false;
        this._alert.showAlert("Error", "Ingrese kilometraje del vehículo");
      }
    } else {
      let params: NavigationExtras = {
        state: {
          car: car
        }
      };
      car.loading = false;
      this.router.navigateByUrl("enlistment", params);
    }
  }

  filterVehicles(event) {
    console.log(event.target);
    this.vehiclesFilter = this.vehicles.filter(
      v =>
        v.PlacaVehiculo.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1
    );
  }
}

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
import { pending } from "../../models/vehicle/pending";
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
  vehicleFavorite: vehicle = new vehicle();
  loading = false;
  working = false;

  constructor(
    private _sesion: SessionService,
    private _vehicle: VehicleService,
    private router: Router,
    private _alert: AlertService,
    private _network: NetworkService
  ) {
   
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.thirdPartie = this._sesion.GetThirdPartie();
    console.log('actualizo');
    this.GetVehicleInformation();
  }
  GetVehicleInformation() {
    this.vehiclesFilter=[];
    this.loading = true;
    console.log(this._network.getCurrentNetworkStatus());
    if (this._network.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      this._vehicle
        .GetVehicleInformation(
          this._sesion.GetBussiness(),
          this._sesion.GetThirdPartie()
        )
        .subscribe(resp => {
          if (resp.Retorno == 0) {
            this._sesion.SetVehicles(resp.ObjTransaction);
            this.vehicles = resp.ObjTransaction;
            

            this.vehicleFavorite = this.vehicles.filter(v => v.Sugerido === 2).length == 0 ? null :this.vehicles.filter(v => v.Sugerido === 2)[0];
            if (this.vehicleFavorite !== undefined && this.vehicleFavorite != null){                        
              this.vehicleFavorite = this.vehicleFavorite;
              this.vehiclesFilter.push(this.vehicleFavorite);
            }
            this.vehicleFavorite = this.vehicles.filter(v => v.Sugerido === 1).length == 0 ? null :this.vehicles.filter(v => v.Sugerido === 1)[0];
            if (this.vehicleFavorite !== undefined && this.vehicleFavorite != null){ 
              this.vehiclesFilter=[];           
              this.vehicleFavorite = this.vehicleFavorite;
              this.vehiclesFilter.push(this.vehicleFavorite);
            }
            
            this.loading = false;
          }
          else {
            this._alert.showAlert('Error', resp.TxtError);
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
                    car.loading = false;
                    let pendings: pending[] = resp.ObjTransaction;
                    if (pendings != null && pendings.length > 0) {
                      let paramsPendings: NavigationExtras = {
                        state: {
                          pendings: pendings,
                          car: car
                        }
                      };
                      this.router.navigateByUrl(
                        "tabs/pendings",
                        paramsPendings
                      );
                    } else {
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
                          this.router.navigateByUrl("tabs/enlistment", params);
                        });
                    }
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
      if (car.NuevoKilometraje != null && car.NuevoKilometraje > 0) {
        this._sesion.SetKilometerCar(car.NuevoKilometraje);
        let params: NavigationExtras = {
          state: {
            car: car
          }
        };
        car.loading = false;
        this.router.navigateByUrl("tabs/enlistment", params);
      }
      else {
        car.loading = false;
        this._alert.showAlert("Error", "Ingrese kilometraje del vehículo");
      }
    }
  }

  filterVehicles(event) {
    this.working=true;
    setTimeout(() => {
      this.working=false;
    }, 200);
   
    this.vehiclesFilter = [];
    console.log(event.target);
    this.vehiclesFilter = this.vehicles.filter(
      v =>
        v.PlacaVehiculo.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 || v.NumeroInterno.indexOf(event.target.value) > -1
    );

    this.vehiclesFilter= this.vehiclesFilter.filter(
      (thing, i, arr) => arr.findIndex(t => t.NumeroInterno.toUpperCase() === thing.NumeroInterno.toUpperCase()) === i
    );
    if (event.target.value==""){
      this.vehiclesFilter = [];
      this.vehiclesFilter.push(this.vehicleFavorite);
    }



   
  }
}

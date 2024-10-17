import { Component, OnInit } from "@angular/core";
import { ThirdPartie } from "../../models/general/user";
import { SessionService } from "../../services/session/session.service";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { vehicle } from "../../models/vehicle/vehicle";
import { Router, NavigationExtras } from "@angular/router";
import { AlertService } from "../../services/alert/alert.service";
import { aliparam } from "src/app/models/vehicle/aliparam";
import { error } from "@angular/compiler/src/util";
import { pending } from "../../models/vehicle/pending";
import {
  NetworkService,
  ConnectionStatus,
} from "src/app/services/network/network.service";
import { NavController, ModalController } from "@ionic/angular";
import { ThirdPartiesService } from "../../services/third-parties/third-parties.service";
import { ThirdPartiesPage } from "../third-parties/third-parties.page";
import { AuthService } from "src/app/services/auth/auth.service";
import { KunasoftService } from "src/app/services/kunasoft/kunasoft.service";
import { takeUntil } from "rxjs/operators";
import { KunasofResponse } from "src/app/models/kunasot/infokunasoft.model";

@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.page.html",
  styleUrls: ["./vehicle.page.scss"],
})
export class VehiclePage {
  isUser = false;
  today = new Date();
  thirdPartie: ThirdPartie = new ThirdPartie();
  thirdPartiesSelected: ThirdPartie[] = [];
  vehicles: vehicle[] = [];
  vehiclesFilter: vehicle[] = [];
  vehicleFavorite: vehicle = new vehicle();
  loading = false;
  working = false;
  odometerInfo:KunasofResponse|undefined;
  calculating:boolean =false;

  constructor(
    private _sesion: SessionService,
    private _vehicle: VehicleService,
    private router: Router,
    private _alert: AlertService,
    private _network: NetworkService,
    private _nav: NavController,
    public _thirdParties: ThirdPartiesService,
    private _modal: ModalController,
    private auth:AuthService,
    private kunasoftService:KunasoftService
  ) {}

  ionViewWillEnter() {    
    if (this.validAccess()) {
      this.isUserLoogued();
      if (
       this._thirdParties.GetThirdParties().length==0
      ) {
        this.goThirdParties();
      } else {        
       // this.thirdPartie = this._sesion.GetThirdPartie();
        this.GetVehicleInformation();
        if (
          this._thirdParties.GetThirdParties() != undefined &&
          this._thirdParties.GetThirdParties() != undefined
        ) {
          this.thirdPartiesSelected = this._thirdParties.GetThirdParties();
        }
      }
    }
    else {
      this.auth.goApp(false);
    }
  }
  validAccess(): boolean {
    // console.log("valid access");
    if (this._sesion.isUser()) {
      // console.log("valid accessssss");
      // console.log(this._sesion.GetUser());
      if (this._sesion.GetUser().Grupo !== "SUPERVISOR") {
        this._alert.showAlert(
          "Acceso no autorizado",
          "No se encuentra autorizado para acceder a esta sección"
        );
        if (this._sesion.GetUser().Grupo == "BENEFICIARIO") {
          this._nav.navigateRoot("tabs/programming");
        }
        if (this._sesion.GetUser().Grupo == "CLIENTE") {
          this._nav.navigateRoot("tabs/programming");
        }

        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  GetVehicleInformation() {
    this.vehiclesFilter = [];
    this.loading = true;
    if (this._network.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      this._vehicle
        .GetVehicleInformation(
          this._sesion.GetBussiness(),
          this._sesion.GetThirdPartie()
        )
        .subscribe((resp) => {
          if (resp.Retorno == 0) {
            this._sesion.SetVehicles(resp.ObjTransaction);
            this.vehicles = resp.ObjTransaction;
            this.loadFavoriteCars();
            this.loading = false;
          } else {
            this._alert.showAlert("Error", resp.TxtError);
          }
        });
    } else {
      this.vehicles = this._sesion.GetVehicles();
      this.loadFavoriteCars();
      this.loading = false;
    }
  }

  loadFavoriteCars() {
    this.vehicleFavorite =
      this.vehicles.filter((v) => v.Sugerido === 1).length == 0
        ? null
        : this.vehicles.filter((v) => v.Sugerido === 1)[0];
    if (this.vehicleFavorite !== undefined && this.vehicleFavorite != null) {
      this.vehiclesFilter = [];
      this.vehicleFavorite = this.vehicleFavorite;
      this.vehiclesFilter.push(this.vehicleFavorite);
      // this.getKilometrajeFavoritecards();
    }
  }


  getKilometrajeFavoritecards(){
    this.calculating = true;
    this.vehiclesFilter.forEach(item=>{
      this.getKilometraje(item)

    })
    this.calculating = false;
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
          .subscribe((resp) => {
            try {
              if (resp.Retorno === 1) {
                throw error(resp.TxtError);
              }
              //console.log(car);
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
              .ArmaProtocolo(
                this._sesion.GetBussiness(),
                car,
                this._sesion.GetThirdPartie()
              )
              .subscribe((resp) => {
                if (resp.Retorno === 1) {
                  throw Error(resp.TxtError);
                }
                this._sesion.SetKilometerCar(car.NuevoKilometraje);
                let params: NavigationExtras = {
                  state: {
                    car: car,
                    params: paramValid
                  },
                };
                car.loading = false;

                // this.router.navigateByUrl("tabs/enlistment", params);
                this.goEnlistment(params);
              });
            } catch (err) {
              //console.log(err);
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
            car: car,           
          },
        };
        car.loading = false;
        this.goEnlistment(params);
      } else {
        car.loading = false;
        this._alert.showAlert("Error", "Ingrese kilometraje del vehículo");
      }
    }
  }

  filterVehicles(event) {
    this.working = true;
    setTimeout(() => {
      this.working = false;
    }, 200);

    this.vehiclesFilter = [];
    //console.log(event.target);
    this.vehiclesFilter = this.vehicles.filter(
      (v) =>
        v.PlacaVehiculo.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 || v.NumeroInterno.indexOf(event.target.value) > -1
    );

    this.vehiclesFilter = this.vehiclesFilter.filter(
      (thing, i, arr) =>
        arr.findIndex(
          (t) =>
            t.NumeroInterno.toUpperCase() === thing.NumeroInterno.toUpperCase()
        ) === i
    );
    if (event.target.value == "") {
      this.vehiclesFilter = [];
      this.vehiclesFilter.push(this.vehicleFavorite);
    }
  }

  goEnlistment(params: NavigationExtras) {


    this._nav.navigateForward("tabs/vehicle/enlistemnt", params);

  }

  async goThirdParties() {
    const modal = await this._modal.create({
      component: ThirdPartiesPage,
    });
    modal.present();
    modal.onDidDismiss().then(data=>{
      if(this._thirdParties.GetThirdParties().length>0){
        this.GetVehicleInformation();
        this.thirdPartiesSelected = this._thirdParties.GetThirdParties();
      }
       
    
    
    })
  }

  isUserLoogued() {
    this.isUser = this._sesion.isUser();
  }


  getKilometraje(vehicle:vehicle){
    this.calculating=true;
    this.kunasoftService.getKilometraje(this._sesion.GetThirdPartie().IdEmpresa,vehicle.PlacaVehiculo )
    .subscribe(resp=>{
      this.calculating=false;
      if(resp!= null && resp.Retorno==0){
          this.odometerInfo = resp.ObjTransaction;
         vehicle.NuevoKilometraje = this.odometerInfo.ODOMETRO;
      }
      
    })
  }
}

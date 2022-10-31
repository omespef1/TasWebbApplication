import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { GESCentroCostos } from "src/app/models/service-request/costcenter";
import { ServicesRequest } from "../../models/service-request/programmings";
import { GescentrocostosService } from "../../services/gencentrocostos/gescentrocostos.service";
import { SessionService } from "../../services/session/session.service";
import { ModalController, NavController } from "@ionic/angular";
import { PoliticalDivisionComponent } from "../political-division/political-division.component";
import { DivisionPolitical } from "src/app/models/general/political-division";
import { CostCenterPage } from "../cost-center/cost-center.page";
import { NgForm } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { GENTercerosService } from "../../services/GENTerceros/genterceros.service";
import { vehicle } from "../../models/vehicle/vehicle";
import { AlertService } from "../../services/alert/alert.service";
import { ServicesRequestService } from "src/app/services/services-request/services-request.service";
import { SignatureComponent } from "../signature/signature.component";
import { Router } from "@angular/router";
import { manchecklist } from '../../models/enlistmen/manchecklist';
import { PoliticalDivisionService } from "src/app/services/political-division/political-division.service";
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { ThirdPartie } from "src/app/models/general/user";
import { transactionObj } from "src/app/models/general/transaction";
import { of } from "rxjs";

@Component({
  selector: "app-programming-new",
  templateUrl: "./programming-new.page.html",
  styleUrls: ["./programming-new.page.scss"],
})
export class ProgrammingNewPage implements OnInit {
  request: ServicesRequest = new ServicesRequest();
  costCenterList: GESCentroCostos[] = [];
  costCenterSelected: GESCentroCostos = new GESCentroCostos();
  cityOrigin: DivisionPolitical = new DivisionPolitical();
  cityTarget: DivisionPolitical = new DivisionPolitical();
  latitude: number = 0;
  longitude: number = 0;
  vehicleApprobed: vehicle = new vehicle();
  loading = false;
  lastEnlistment: manchecklist = new manchecklist();
  lastServiceApprobed: ServicesRequest = new ServicesRequest();
  aliParams: any;
  constructor(
    private costCenterService: GescentrocostosService,
    private session: SessionService,
    private modal: ModalController,
    private geo: Geolocation,
    private genTercerosService: GENTercerosService,
    private alert: AlertService,
    private requestService: ServicesRequestService,
    private nav: NavController,
    private router: Router,
    private changes: ChangeDetectorRef,
    private politicalDivisionService: PoliticalDivisionService,
    private vehicleService: VehicleService
  ) {

    this.request = this.router.getCurrentNavigation().extras.state.request;
  }

  async ngOnInit() {
    

this.loadData();
  
   
  }


  async loadData(){    
    this.getAliParams();    
    //  await this.checkStatusServices();
    this.getModalities();  
    this.getInfoVehicle();   
    await this.getlocation();   
    await this.checkApprovedLicensePlate();    
    this.setbehaviorLoad();   
    console.log(this.request);
  }

  setbehaviorLoad() {
    if (this.request.SolicitudId > 0) {
      this.addDetailsEnd();
      this.getNameOriginCity(this.request.OrigenCiudad);
      this.getNameTargetCity(this.request.DestinoCiudad);
    } else {
      this.addDetailsInit();
      this.GetLastServiceThirdPartieApproved();
    }
  }

  getlocation() {
    return this.geo.getCurrentPosition().then((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });
  }

  async showPopUpModalidad() {
    const modal = await this.modal.create({
      component: CostCenterPage,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.costCenterSelected = resp.data;
        this.request.CentrocostosId = this.costCenterSelected.CentrocostosId;
      }
    });
    return await modal.present();
  }

  async showPopupCitiesOrigin() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.cityOrigin = resp.data;
        this.cityTarget = resp.data;
        this.request.OrigenCiudad = this.cityOrigin.IdDivisionPolitica;
        this.request.DestinoCiudad = this.cityOrigin.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }

  async showPopupCitiesTarget() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.cityTarget = resp.data;
        this.request.DestinoCiudad = this.cityTarget.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }

  addDetailsInit() {
    if (
      this.request.SolicitudId == 0 &&
      this.request.GESSolicitudServiciosDetalle.length == 0
    ) {
      this.request.GESSolicitudServiciosDetalle.push({
        SolicitudId: 0,
        EmpresaId: this.session.GetThirdPartie().IdEmpresa,
        Kilometraje: 0,
        Estado: "I",
        Latitude: this.latitude,
        Longitude: this.longitude,
        observations: "",
        Id: 0,
        UsuarioCrea: "",
        UsuarioModifica: "",
        FechaCrea: new Date(),
        FechaModifica: new Date(),
      });
      this.request.GESSolicitudServiciosDetalle.push({
        SolicitudId: 0,
        EmpresaId: this.session.GetThirdPartie().IdEmpresa,
        Kilometraje: 0,
        Estado: "O",
        Latitude: this.latitude,
        Longitude: this.longitude,
        observations: "",
        Id: 2,
        UsuarioCrea: "",
        UsuarioModifica: "",
        FechaCrea: new Date(),
        FechaModifica: new Date(),
      });
      this.request.GESSolicitudServiciosDetalle.push({
        SolicitudId: 0,
        EmpresaId: this.session.GetThirdPartie().IdEmpresa,
        Kilometraje: 0,
        Estado: "R",
        Latitude: this.latitude,
        Longitude: this.longitude,
        observations: "",
        Id: 3,
        UsuarioCrea: "",
        UsuarioModifica: "",
        FechaCrea: new Date(),
        FechaModifica: new Date(),
      });
    }
  }

  addDetailsEnd() {
    if (
      this.request.SolicitudId > 0 &&
      this.request.GESSolicitudServiciosDetalle.length == 3
    ) {
      this.request.GESSolicitudServiciosDetalle.push({
        SolicitudId: this.request.SolicitudId,
        EmpresaId: this.session.GetThirdPartie().IdEmpresa,
        Kilometraje: 0,
        Estado: "F",
        Latitude: this.latitude,
        Longitude: this.longitude,
        observations: "",
        Id: 0,
        UsuarioCrea: "",
        UsuarioModifica: "",
        FechaCrea: new Date(),
        FechaModifica: new Date(),
      });
      this.changes.detectChanges();
    }
  }
  checkApprovedLicensePlate() {
    return this.genTercerosService
      .IsAuthorizedForService(
        this.session.GetThirdPartie().IdEmpresa,
        this.session.GetThirdPartie().IdTercero
      )
      .subscribe((resp) => {
        if (resp != undefined && resp.Retorno == 0) {
          this.vehicleApprobed = resp.ObjTransaction;
        }
      }, err => {
        if (err.ok == false) {

          this.session.GetIsAuthorizedForServiceOffline().then(data => {
            this.vehicleApprobed = data;
          })
        }

      });
  }

  prepareDetailsForSending() {
    if (this.request.SolicitudId == 0) {
      this.request.GESSolicitudServiciosDetalle[0].Latitude = this.latitude;
      this.request.GESSolicitudServiciosDetalle[0].Longitude = this.longitude;
      this.request.GESSolicitudServiciosDetalle[1].Kilometraje =
        this.request.GESSolicitudServiciosDetalle[0].Kilometraje;
      this.request.GESSolicitudServiciosDetalle[2].Kilometraje =
        this.request.GESSolicitudServiciosDetalle[0].Kilometraje;
      this.request.GESSolicitudServiciosDetalle[1].Latitude = this.latitude;
      this.request.GESSolicitudServiciosDetalle[2].Latitude = this.latitude;
      this.request.GESSolicitudServiciosDetalle[1].Longitude = this.longitude;
      this.request.GESSolicitudServiciosDetalle[2].Longitude = this.longitude;
    } else {
      this.request.GESSolicitudServiciosDetalle[3].Latitude = this.latitude;
      this.request.GESSolicitudServiciosDetalle[3].Longitude = this.longitude;
    }
  }
  createService() {
    try {
      this.loading = true;
      if (this.request.GESSolicitudServiciosDetalle[0].Kilometraje < this.vehicleApprobed.Kilometraje) {

        throw Error('El kilometraje especificado no puede ser inferior al kilometraje actual del vehículo');
      }







      this.prepareDetailsForSending();

      if (this.request.GESSolicitudServiciosDetalle.length > 2 && this.request.SolicitudId > 0) {
        if (this.request.GESSolicitudServiciosDetalle[3].Kilometraje < this.request.GESSolicitudServiciosDetalle[0].Kilometraje) {

          throw Error('El kilometraje especificado no puede ser inferior al kilometraje de inicio del servicio');
        }

        if (
          this.request.GESSolicitudServiciosDetalle[3].Kilometraje - this.request.GESSolicitudServiciosDetalle[0].Kilometraje >
          this.aliParams.Par_TopeKilometraje
        ) {

          throw Error(`Nuevo Kilometraje no puede ser superior al tope estipulado: ${this.aliParams.Par_TopeKilometraje}`);
        }
      }
      else {


        if (
          this.request.GESSolicitudServiciosDetalle[0].Kilometraje - this.vehicleApprobed.Kilometraje >
          this.aliParams.Par_TopeKilometraje
        ) {

          throw Error(`Nuevo Kilometraje no puede ser superior al tope estipulado: ${this.aliParams.Par_TopeKilometraje}`);
        }
      }



      this.request.EmpresaId = this.session.GetThirdPartie().IdEmpresa;
      this.request.VehiculoId = this.vehicleApprobed.IdVehiculo;
      this.request.TipoVehiculoId = this.vehicleApprobed.IdTipoVehiculo;
      this.request.ConductorId = this.session.GetThirdPartie().IdTercero;
      this.request.Estado = "A";
      this.loading = true;
      this.requestService.PostServiceApp(this.request).subscribe((resp) => {
        if (resp != null && resp.Retorno == 0) {
          this.alert.successSweet("Servicio creado");
          this.nav.navigateBack("tabs/programming");
          this.request = new ServicesRequest();
        } else {
          this.alert.showAlert("Error", resp.TxtError);
          this.loading = false;
        }
      });
    } catch (error) {
      if (error.ok == false) {
        this.session.setServiceOffline(this.request);
        this.session.setLastsServiceThirdPartieApprovedOffline(this.request).then(()=>{
          this.alert.successSweet("Servicio creado");
          this.nav.navigateBack("tabs/programming");
          this.request = new ServicesRequest();
        })
      
      
      }
      else {
        this.alert.showAlert("Error", error);
        this.loading = false;
      }
   
    }
  }

  FinalizeService() {

    try {
      if (this.request.GESSolicitudServiciosDetalle[3].Kilometraje < this.request.GESSolicitudServiciosDetalle[0].Kilometraje) {

        throw Error('El kilometraje especificado no puede ser inferior al kilometraje de inicio del servicio');
      }

      this.requestService.PostServiceApp(this.request).subscribe((resp) => {
        if (resp != null && resp.Retorno == 0) {
          this.alert.successSweet("Servicio terminado!");
          this.nav.navigateRoot("tabs/programming");
          this.request = new ServicesRequest();
        } else {
          this.alert.showAlert("Error", resp.TxtError);
          this.loading = false;
        }
      });

    } catch (error) {
      this.alert.showAlert('Sistema', error);
    }

  }

  async showModalSignature() {
    const modal = await this.modal.create({
      component: SignatureComponent,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        console.log(resp);
        this.request.Firma = resp.data;
      }
    });
    return await modal.present();
  }

  checkStatusServices() {
    return this.requestService
      .CheckPendingServices(
        this.session.GetThirdPartie().IdEmpresa,
        this.session.GetThirdPartie().IdTercero
      )
      .subscribe((resp) => {
        if (resp != undefined && resp.Retorno == 0) {
          this.request = resp.ObjTransaction;
        } else {
          this.alert.showAlert("Error", resp.TxtError);
        }
      });
  }

  getModalities() {
    this.costCenterService
      .GetCostCenterCompany(this.session.GetThirdPartie().IdEmpresa)
      .subscribe((resp) => {
        if (resp != null && resp.Retorno == 0) {
          this.costCenterList = resp.ObjTransaction;
        }
      }, err => {
        if (err.ok == false) {

          this.session.GetModalitiesOffline().then(data => {
            this.costCenterList = data;
          })
        }

      });
  }

  GetLastEnlistmentThirdPartieApproved() {
    this.genTercerosService.GetLastEnlistmentThirdPartieApproved(this.session.GetThirdPartie().IdEmpresa, this.session.GetThirdPartie().IdTercero).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.lastEnlistment = resp.ObjTransaction;
      }
    })
  }

  GetLastServiceThirdPartieApproved() {
    this.requestService.GetLastsServiceThirdPartieApproved(this.session.GetThirdPartie().IdEmpresa, this.session.GetThirdPartie().IdTercero).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.lastServiceApprobed = resp.ObjTransaction;

        this.request.OrigenCiudad = this.lastServiceApprobed.OrigenCiudad;
        this.request.DestinoCiudad = this.lastServiceApprobed.DestinoCiudad;

        this.getNameTargetCity(this.request.OrigenCiudad);
        this.getNameOriginCity(this.request.OrigenCiudad)
      }
    }, err => {
      if (err.ok == false) {

        this.session.GetLastsServiceThirdPartieApprovedOffline().then(data => {
          this.lastServiceApprobed = data;

          this.request.OrigenCiudad = this.lastServiceApprobed.OrigenCiudad;
          this.request.DestinoCiudad = this.lastServiceApprobed.DestinoCiudad;
  
          this.getNameTargetCity(this.request.OrigenCiudad);
          this.getNameOriginCity(this.request.OrigenCiudad)
        })
      }

    })
  }


  getNameTargetCity(cityId: number) {
    this.politicalDivisionService.GetPoliticalDivisionByID(cityId).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.cityTarget = resp.ObjTransaction;
      }
    }, err => {
      if (err.ok == false) {

        this.session.GetPoliticalDivisionOffline().then(data => {
          this.cityTarget = data.filter(c => c.IdDivisionPolitica == cityId)[0];
        })
      }
    })
  }


  getNameOriginCity(cityId: number) {
    this.politicalDivisionService.GetPoliticalDivisionByID(cityId).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.cityOrigin = resp.ObjTransaction;
      }
    }, err => {
      if (err.ok == false) {

        this.session.GetPoliticalDivisionOffline().then(data => {
          this.cityOrigin = data.filter(c => c.IdDivisionPolitica == cityId)[0];
        })
      }
    })

  }


  getInfoVehicle() {
    this.vehicleService.GetVehicleInformationById(this.vehicleApprobed.IdEmpresa, this.vehicleApprobed.IdVehiculo)
  }


  getAliParams() {
    this.vehicleService.GetDocumentsValidationCompany(this.session.GetThirdPartie().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.aliParams = resp.ObjTransaction;
      }
    }, err => {
      if (err.ok == false) {

        this.session.GetAliParamsOffline().then(resp => {
          this.aliParams = resp;
        })
      }

    })
  }


//   getInformationThirdPartie() {

   
//  return   this.genTercerosService.GetById(this.session.GetThirdPartie().IdEmpresa, this.session.GetThirdPartie().IdTercero).subscribe(resp => {
//         if (resp != null && resp.Retorno == 0) {

//          return of(resp);
//         }
//         else {
//           return of(null);
//         }

//       }, err => {

//         if (err.ok == false) {

//           this.session.GetByIdOffline().then(resp => {
//             return of(resp);
//           })
//         }
//       })

   


  
//   }




}

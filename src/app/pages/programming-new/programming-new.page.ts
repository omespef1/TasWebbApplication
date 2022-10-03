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
    private changes: ChangeDetectorRef
  ) {
    this.request = this.router.getCurrentNavigation().extras.state.request;
  }

  async ngOnInit() {
    //  await this.checkStatusServices();
this.getModalities();
    await this.getlocation();

    await this.checkApprovedLicensePlate();
      
    this.setbehaviorLoad();
    console.log(this.request);
  }

  setbehaviorLoad() {
    if (this.request.SolicitudId > 0) {
      this.addDetailsEnd();
    } else {
      this.addDetailsInit();
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
      this.prepareDetailsForSending();

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
      this.alert.showAlert("Error", error);
      this.loading = false;
    }
  }

  FinalizeService() {
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
      });
  }
}

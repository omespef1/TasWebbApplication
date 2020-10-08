import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicesRequestService } from "../../services/services-request/services-request.service";
import { SessionService } from "../../services/session/session.service";
import { AlertService } from "../../services/alert/alert.service";
import { ServiceRequestDetail } from "../../models/service-request/programmings";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { StatesRequestProgrammingPipe } from "src/app/pipes/states-request-programming.pipe";
@Component({
  selector: "app-programming-detail",
  templateUrl: "./programming-detail.page.html",
  styleUrls: ["./programming-detail.page.scss"],
})
export class ProgrammingDetailPage implements OnInit {
  programming: any={};
  loadingMap = true;
  theHtmlString: any;
  sending = false;
  textButton = "NUEVO SEGUIMIENTO";
  observations="";
  constructor(
    private router: Router,
    private _san: DomSanitizer,
    private _service: ServicesRequestService,
    private _modal: ModalController,
    private _alert: AlertService,
    private _sesion: SessionService,
    private geo: Geolocation
  ) {

    this.programming.details = [];
  }

  ngOnInit() {
    this.programming = this.router.getCurrentNavigation().extras.state.programming;
    //this.loadDetail();
  }

  ionViewDidEnter(){
    this.loadDetail();
  }

  loadDetail() {
    this._service
      .GetServicesDetail(
        this.programming.EmpresaId,
        this.programming.SolicitudId
      )
      .subscribe((resp) => {
        if (resp.ObjTransaction) {
          this.programming.details = resp.ObjTransaction;
        }
      });
  }

  loadMap(latitude: number, long: number) {    
    return this._san.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${latitude}, ${long}&z=15&output=embed`
    );
    

    // const myLatLng = { lat: latitude, lng: long};
    // const mapEle: HTMLElement = document.getElementById('map');
    // this.mapRef = new google.maps.Map(mapEle, {
    //   center: myLatLng,
    //   zoom: 12
    // });
    // google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
    //   this.loadingMap=false;
    //   this.addMaker(myLatLng.lat, myLatLng.lng);
    // });
  }

  setState() {
    const buttons: any[] = [
      {
        text: "Cancelar",
        role: "Cancel",
      },
      {
        text: "Aceptar",
        role: "OK",
        handler: (value: any) => {
          this.setNewLog(value);
        },
      },
    ];

    let radios: any[] = [
      {
        type: "radio",
        value: "R",
        label: "EN RUTA",
        checked: false,
      },
      {
        type: "radio",
        value: "O",
        label: "EN ORIGEN",
        checked: false,
      },
      {
        type: "radio",
        value: "I",
        label: "INICIO",
        checked: false,
      },
      {
        type: "radio",
        value: "F",
        label: "FINAL",
        checked: false,
      },
    ];

    this._alert.showCustomAlert(
      "Estado",
      "¿Cual es el estado del servicio a ingresar?",
      "",
      buttons,
      radios,
      true
    );
  }
  setNewLog(value: any) {
    this.textButton = "Localizando...";
    this.sending = true;
    this.geo.getCurrentPosition().then((data) => {
      this.textButton = "Esperando...";

      setTimeout(() => {




        let log: ServiceRequestDetail = new ServiceRequestDetail();
        log.SolicitudId = this.programming.SolicitudId;
        log.EmpresaId = this._sesion.GetThirdPartie().IdEmpresa;
        log.Estado = value;
        log.Latitude = data.coords.latitude;
        log.Longitude = data.coords.longitude;
        log.observations = this.observations;
        this._service.PostServicesDetail(log).subscribe(
          (resp:any) => {
            this.sending = false;
            if (resp.Retorno === 0) {
              this.textButton = "NUEVO SEGUIMIENTO";
              this._alert.showAlert("Perfecto!", "Seguimiento ingresado");
              this.loadDetail();
            } else {
              this.textButton = "NUEVO SEGUIMIENTO";
              this._alert.showAlert("Error", resp.TxtError);
            }
          },
          (err) => {
            this.sending = false;
            this.textButton = "Error";
          }
        );
      }, 3000);
    });
  }
}

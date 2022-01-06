import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicesRequestService } from "../../services/services-request/services-request.service";
import { SessionService } from "../../services/session/session.service";
import { AlertService } from "../../services/alert/alert.service";
import { ServiceRequestDetail } from "../../models/service-request/programmings";
import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { TransportRequestService } from '../../services/transport-request/transport-request.service';
import TypeValidator from '../../enums/type-validator.enum';
import { PassengerService } from '../../services/passenger/passenger.service';
import { FactoryValidator } from '../../factory/validator-passenger.factory';
import { ModalController } from "@ionic/angular";
import { PassengersComponent } from "../passengers/passengers.component";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { transactionObj } from '../../models/general/transaction';

@Component({
  selector: "app-programming-detail",
  templateUrl: "./programming-detail.page.html",
  styleUrls: ["./programming-detail.page.scss"],
})
export class ProgrammingDetailPage implements OnInit {
  factoryValidator: FactoryValidator;
  programming: any = {};
  loadingMap = true;
  theHtmlString: any;
  sending = false;
  value = 'This is my barcode secret data';
  textButton = "Nuevo seguimiento";
  observations = "";
  constructor(
    private router: Router,
    private _san: DomSanitizer,
    private _service: ServicesRequestService,
    private _alert: AlertService,
    public _sesion: SessionService,
    private geo: Geolocation,
    private _request: TransportRequestService,
    private passengerService: PassengerService,
    private modalController: ModalController,
    private barcodeScanner: BarcodeScanner) {
    this.factoryValidator = new FactoryValidator(this.passengerService, _alert, this.barcodeScanner);
    this.programming.details = [];
  }

  ngOnInit() {
    this.programming = this.router.getCurrentNavigation().extras.state.programming;
    //this.loadDetail();
  }

  ionViewDidEnter() {
    this.loadDetail();
    this.getPassengers();
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
    const log: ServiceRequestDetail = new ServiceRequestDetail();
    log.SolicitudId = this.programming.SolicitudId;
    log.EmpresaId = this._sesion.GetThirdPartie().IdEmpresa;
    log.Estado = value;
    this._request.SetTransportRequestFailed(log).then(() => {
      this.geo.getCurrentPosition().then((data) => {
        this.textButton = "Esperando...";
        setTimeout(() => {
          log.Latitude = data.coords.latitude;
          log.Longitude = data.coords.longitude;
          log.observations = this.observations;
          // Guardamos el intento en los fallidos en caso de que falle        
          this._service.PostServicesDetail(log).subscribe(
            (resp: any) => {
              this.sending = false;
              // Borramos el intento ya que el servidor si respondió
              this._request.deleteTransportFailed();
              if (resp.Retorno === 0) {
                this.textButton = "Nuevo seguimiento";
                this._alert.showAlert("Perfecto!", "Seguimiento ingresado");
                this.loadDetail();
              } else {
                this.textButton = "Nuevo seguimiento";
                this._alert.showAlert("Error", resp.TxtError);
              }
            },
            (err) => {
              this.sending = false;
              this.textButton = "Error";
              console.log(err);
            }
          );
        }, 3000);
      });
    })

  }

  async validPassenger(type: TypeValidator) {
    let factory = this.factoryValidator.createValidator(type)
    factory.identification = ".";
    while (factory.identification.length > 0) {

      let resp = <transactionObj<boolean>>await factory.validPassenger(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId)
      if (resp != null && resp.Retorno == 0) {

        let data = <Geoposition>await this.geo.getCurrentPosition()
        if (resp.ObjTransaction == true) {
          // this._alert.successSweet("Pasajero validado correctamente!");
          factory.uploadPassenger(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId, data.coords.latitude, data.coords.longitude)
        }
      }
      if (resp.ObjTransaction == false || resp.Retorno == 1) {
        this._alert.errorSweet(resp.TxtError);
      }
    }
  }










  // if(type == TypeValidator.Automatic){

  //   let resultScan ="";

  //   while(resultScan!= undefined && resultScan.length>0){
  //     this.barcodeScanner.scan().then(barcodeData => {
  //       console.log('Barcode data', barcodeData);
  //                   this.passengerService.checkPassenger(this._sesion.GetThirdPartie().IdEmpresa,this.programming.SolicitudId,barcodeData.text).subscribe(resp => {

  //                     this.geo.getCurrentPosition().then((data) => {
  //                         if(resp!= null && resp.Retorno==0){

  //                           factory.uploadPassenger(this._sesion.GetThirdPartie().IdEmpresa,this.programming.SolicitudId,data.coords.latitude,data.coords.longitude)
  //                         }
  //                     });

  //                   })
  //      }).catch(err => {
  //         resultScan="";
  //      });
  //   }


  // }




  getPassengers() {

    this.passengerService.getPassengers(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {

        this.programming.passengers = resp.ObjTransaction;
      }
    })

  }


  async showModalPassengers() {
    const modal = await this.modalController.create({
      component: PassengersComponent,
      componentProps: {
        passengers: this.programming.passengers,
      }
    });

    return await modal.present();


  }


}



import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicesRequestService } from "../../services/services-request/services-request.service";
import { SessionService } from "../../services/session/session.service";
import { AlertService } from "../../services/alert/alert.service";
import { ServiceRequestDetail } from "../../models/service-request/programmings";
import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { TransportRequestService } from '../../services/transport-request/transport-request.service';
import { ModalController } from "@ionic/angular";
import { PassengersComponent } from "../passengers/passengers.component";
import { transactionObj } from '../../models/general/transaction';
import { PassengerService } from '../../services/passenger/passenger.service';
import TypeValidator from "src/app/enums/type-validator.enum";
import { FactoryValidator } from '../../factory/validator-passenger.factory';
import { ValidateCodePage } from "src/app/validate-code/validate-code.page";
import { GesContratosService } from "src/app/services/contratos/contratos.service";
import { GESContratos } from "src/app/models/contracts/contract.model";
import { GENPasajerosService } from "src/app/services/GENPasjaeros/genpasajeros.service";
import { GENPassengersPage } from "../genpassengers/genpassengers.page";

@Component({
  selector: "app-programming-detail",
  templateUrl: "./programming-detail.page.html",
  styleUrls: ["./programming-detail.page.scss"],
})
export class ProgrammingDetailPage implements OnInit {
  programming: any = {};
  loadingMap = true;
  theHtmlString: any;
  sending = false;
  value = 'This is my barcode secret data';
  textButton = "Nuevo seguimiento";
  observations = "";
  contract:GESContratos = null;
  constructor(
    private router: Router,
    private _san: DomSanitizer,
    private _service: ServicesRequestService,
    private _alert: AlertService,
    public _sesion: SessionService,
    private geo: Geolocation,
    private _request: TransportRequestService,
    private modalController: ModalController,
    private passengerService:PassengerService,
    private factoryValidator:FactoryValidator,
    private contratos:GesContratosService,
    private GENPasajerosService:GENPasajerosService) {
    this.programming.details = [];
    this.programming.GENPasajerosServicios = [];
  }

  ngOnInit() {
    this.programming = this.router.getCurrentNavigation().extras.state.programming;
    this.getContrato();
    //this.loadDetail();
  }

  ionViewDidEnter() {
    this.loadDetail();
 
  }

  getContrato(){
    if(this._sesion.GetUser() == undefined){
      this.contratos.getByCode(this._sesion.GetThirdPartie().IdEmpresa,this.programming.ContratoId).subscribe(resp=>{
        if(resp!=undefined && resp.Retorno==0){
          debugger;
        this.contract = resp.ObjTransaction;
        }
      })
    }

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
          this.setNewLog(value,false);
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


    
  isVip(){
    return !!this._sesion.GetUser() && this._sesion.GetUser().Grupo === "VIP";
  }
  
  setNewLog(value: any,confirmed:boolean,code:number=0) {
    if(value != "F" || confirmed == true){
      this.textButton = "Localizando...";
      this.sending = true;
      const log: ServiceRequestDetail = new ServiceRequestDetail();
      log.SolicitudId = this.programming.SolicitudId;
      log.EmpresaId = this._sesion.GetThirdPartie().IdEmpresa;
      log.Estado = value;
      if(code>0){
        log.CodigoConfirmacion = code;
      }
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
                // console.log(err);
              }
            );
          }, 3000);
        });
      })
    }
    else {


      if(this.contract.UsoCodigo)
this.showModalCode();

    }


  }


  async showModalPassengers() {
    const modal = await this.modalController.create({
      component: PassengersComponent,
      componentProps: {
        service: this.programming,
      }
    });

    return await modal.present();


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

  getPassengers() {

    this.passengerService.getPassengers(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {

        this.programming.passengers = resp.ObjTransaction;
      }
    })

  }

  async showModalCode() {
    const modal = await this.modalController.create({
      component:  ValidateCodePage,
      componentProps: {
        'title': 'Ingresa el código de verificación enviado a su teléfono y/o su email.'
      }
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        // console.log(resp);
        debugger;
        this.setNewLog("F",true,resp.data);
      }
    });
    return await modal.present();
  }

  getPassengersService(){
    this.GENPasajerosService.GetInfoPassengerByService(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.programming.GENPasajerosServicios = resp.ObjTransaction;
      }
    })
  }


  async showModalGenPassengers() {
    const modal = await this.modalController.create({
      component: GENPassengersPage,
      componentProps: {
        passengers: this.programming.GENPasajerosServicios,
      }
    });

    return await modal.present();


  }

  call(callNumber:string){
    this.callService.call(callNumber);
  
    }

}



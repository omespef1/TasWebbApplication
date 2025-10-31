import { ServicesRequestService } from './../../services/services-request/services-request.service';
import { GENTercerosService } from 'src/app/services/GENTerceros/genterceros.service';
import { GENPasajerosServicios } from 'src/app/models/genpasajeroservicios/genpasajerosservicios.model';
import { finalize } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { SessionService } from "../../services/session/session.service";
import { AlertService } from "../../services/alert/alert.service";
import { ServiceRequestDetail } from "../../models/service-request/programmings";
import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { TransportRequestService } from '../../services/transport-request/transport-request.service';
import { ModalController, NavController } from "@ionic/angular";
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
import { GENPasajerosServiciosService } from "src/app/services/genpasajerosservicios/genpasajerosservicios.service";
import { MonitoreoService } from 'src/app/services/monitoreo/monitoreo.service';
import { PositionService } from 'src/app/services/position/position.service';
import { ThirdPartie } from 'src/app/models/general/user';
import { BehaviorSubject } from 'rxjs';
import { PoliticalDivisionComponent } from '../political-division/political-division.component';
import { SignatureComponent } from '../signature/signature.component';
import { ValidCodeComponent } from 'src/app/components/valid-code/valid-code.component';
import { DtoPointControl, GESSolicitudServiciosPuntosControl } from 'src/app/models/gessolicitudpuntoscontrol/gessolicitudpuntoscontrol.model';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
@Component({
  selector: "app-programming-detail",
  templateUrl: "./programming-detail.page.html",
  styleUrls: ["./programming-detail.page.scss"],
})
export class ProgrammingDetailPage implements OnInit {
  showExternPassengerButton = false;
  programming: any = {};
  serviceInit = false;
  loadingMap = true;
  theHtmlString: any;
  sending = false;
  value = 'This is my barcode secret data';
  textButton = "Nuevo seguimiento";
  observations = "";
  contract: GESContratos;
  locating = false;
  loading = false;
  drivers: BehaviorSubject<ThirdPartie[]> = new BehaviorSubject<ThirdPartie[]>(null);
  oldDriver: ThirdPartie = new ThirdPartie();
  targetChanged = false;
  oldTarget: { id: number, text: string } = { id: 0, text: "" };
  Firma: string = "";
  kilometraje: number = 0;
  signatureRejected = false;
  loadingPhoto = false;
  allPointsControls: BehaviorSubject<DtoPointControl[]> = new BehaviorSubject<DtoPointControl[]>([]);
  isPassengerRoute = false;
  isFromQr = false;
  constructor(
    private router: Router,
    private _san: DomSanitizer,
    private _service: ServicesRequestService,
    private _alert: AlertService,
    public _sesion: SessionService,
    private geo: Geolocation,
    private _request: TransportRequestService,
    private modalController: ModalController,
    private passengerService: PassengerService,
    private factoryValidator: FactoryValidator,
    private contratos: GesContratosService,
    private GENPasajerosService: GENPasajerosService,
    private GENPasajerosServiciosService: GENPasajerosServiciosService,
    private changes: ChangeDetectorRef,
    private monitoreoService: MonitoreoService,
    private positionService: PositionService, private gentercerosService: GENTercerosService,
    private gessolicitudServiciosService: ServicesRequestService,
    private nav: NavController,
    private route: ActivatedRoute,
    private camera: Camera,
    private geolocation: Geolocation,) {
    this.programming.details = [];
    this.programming.GENPasajerosServicios = [];
  }

  ngOnInit() {
   debugger;
    this.loading=true;
    const modoProximo = this.route.snapshot.queryParamMap.get('nearest');
    this.isPassengerRoute = this.checkIsPassengerRouteReady();
     if (modoProximo === 'true') {
      const companyId =this._sesion.GetBussiness().CodigoEmpresa;
      const thirdPartieId = this._sesion.GetUser().IdPasajero;
      this._service.GetNearestService(companyId, thirdPartieId).subscribe(resp => {
        debugger;
       let services:any[] =  resp.ObjTransaction;
        if (resp.ObjTransaction && resp.Retorno === 0 && services && services.length > 0) {

          if( services && services.length == 1) {
            this.programming = resp.ObjTransaction[0];
            this.initializeAfterProgrammingLoaded();
          }
          if( services && services.length > 1) {
             this._alert.showServiceSelectionAlert(services, (selectedService) => {
    this.programming = selectedService;
    this.initializeAfterProgrammingLoaded();
  });
          }
         
        } else {
          this._alert.errorSweet('No se encontró servicio próximo.');           
               this.loading=false;
        }
      });
    } else {
      this.programming = this.router.getCurrentNavigation().extras.state.programming;
      this.initializeAfterProgrammingLoaded();
    }
  }

  initializeAfterProgrammingLoaded() {
    this.oldDriver = this.programming.ConductorId;
    this.getContrato();
    this.getDrivers();
    this.getPointsControl();
     if (this.programming.SolicitudId) {
      this.loadDetail();
    }
  }

  // ionViewDidEnter() {
  //   if (this.programming.EmpresaId && this.programming.SolicitudId) {
  //     this.loadDetail();
  //   }
  // }


  checkIsPassengerRouteReady() {
    console.log(this._sesion.GetUser());
    console.log(this.isFromQr);
    const user = this._sesion.GetUser();
    if (user && user.IdPasajero && user.Grupo == 'PASAJERO_RUTA')
      return true;
    else return false;
  }


  getContrato() {
    let company = this._sesion.GetUser() == undefined ? this._sesion.GetThirdPartie().IdEmpresa : this._sesion.GetUser().IdEmpresa

    this.contratos.getByCode(company, this.programming.ContratoId).subscribe(resp => {
      if (resp != undefined && resp.Retorno == 0) {
        this.contract = resp.ObjTransaction;
        this.shouldShowValidatePassengerButton();
        this.changes.detectChanges();
      }
    })


  }

  loadDetail() {
    this._service
      .GetServicesDetail(
        this.programming.EmpresaId,
        this.programming.SolicitudId
      )
      .subscribe((resp) => {
        this.loading=false;
        if (resp.ObjTransaction) {
          this.programming.details = resp.ObjTransaction;
          this.oldTarget = { id: this.programming.DestinoCiudad, text: this.programming.Destino };
          let details: ServiceRequestDetail[] = this.programming.details;
          this.checkPassengers();
          this.checkServiceInit();
        }
      });
  }

    checkDetailAndInRoute() {
    this._service
      .GetServicesDetail(
        this.programming.EmpresaId,
        this.programming.SolicitudId
      )
      .subscribe((resp) => {
        this.loading=false;
        if (resp.ObjTransaction) {
          this.programming.details = resp.ObjTransaction;          
          let details: ServiceRequestDetail[] = this.programming.details;         
         if(details.filter(x => x.Estado == 'I').length > 0){
            this.locateDriver();
         }
         else {
            this._alert.errorSweet('El servicio no ha iniciado aún, por favor espere a que el servicio esté en inicio antes de consultar su ubicación nuevamente.');
         }
        }
      });
  }




  getPointsControl() {
    if (this._sesion.GetThirdPartie() != undefined) {
      this.gessolicitudServiciosService.getPointsControl(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId).subscribe(resp => {
        if (resp && resp.Retorno == 0) {
          this.allPointsControls.next(resp.ObjTransaction);
        }
      })
    }

  }
  loadMap(latitude: number, long: number) {
    return this._san.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${latitude}, ${long}&z=15&output=embed`
    );


  }

  takePicture(point: DtoPointControl) {
    this.loadingPhoto = true;
    // Verificar si la aplicación se está ejecutando en un navegador
    const isBrowser = !window.hasOwnProperty('cordova');

    if (isBrowser) {
      // La aplicación se está ejecutando en un navegador, solicitar imagen de la fototeca
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.accept = 'image/jpeg';

      inputElement.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];

          const reader = new FileReader();

          reader.onload = () => {
            this.loadingPhoto = false;
            point.ImageUrl = this.eliminarEncabezadoBase64(reader.result) as string;
          };

          reader.readAsDataURL(file);
        }
      });

      inputElement.click();
    } else {
      // La aplicación se está ejecutando en un dispositivo móvil, utilizar la cámara
      const options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(options).then(
        (imageData) => {
          this.loadingPhoto = false;
          point.ImageUrl = imageData;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  eliminarEncabezadoBase64(variable) {
    const encabezado = 'data:image/jpeg;base64,';

    if (variable.startsWith(encabezado)) {
      return variable.substring(encabezado.length);
    }

    return variable;
  }

  checkServiceInit() {
    const detials: any[] = this.programming.details;
    this.serviceInit = detials.filter(x => x.Estado == 'I').length > 0;
  }

  sendPointControl(point: DtoPointControl) {
    this.locating = true;
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.locating = false;
        this.postPointControl(point, resp.coords.latitude, resp.coords.longitude);
      })
      .catch((error) => {
        this.locating = false;
        //console.log("Error getting location", error);
        this.postPointControl(point, 0, 0);
      });
  }

  postPointControl(point: DtoPointControl, latitude: number, longitude: number) {
    point.Longitude = longitude;
    point.Latitude = latitude;
    this.gessolicitudServiciosService.postPointControl(point).subscribe(

      resp => {

        if (resp != null && resp.Retorno == 0) {
          this._alert.successSweet('Punto de control guardado!')
        }
        else {
          this._alert.errorSweet(resp.TxtError)
        }
      }, err => {
        this._alert.errorSweet('Error inesperado');
      }
    )
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
          let passengers: any[] = this.programming.GENPasajerosServicios;
          if (!this.contract.InteraccionPasajero) {          
            if (value == 'F') {
                if(this.contract.PideKilometraje ){
                this.showKilometerModal().then(resp => {
                if (this.kilometraje == 0) {
                  this._alert.showAlert('Kilometraje', 'El kilometraje no puede ser 0');
                  return;
                }
                this.showModalSignature(value, passengers);
              })
                } 
                else {
                   this.showModalSignature(value, passengers);
                }
           
            }
            if (value == 'I') {
              if(this.contract.PideKilometraje ){

                    this.showKilometerModal().then(resp => {

                if (this.kilometraje == 0) {
                  this._alert.showAlert('Kilometraje', 'El kilometraje no puede ser 0');
                  return;
                }
                this.setNewLog(value, passengers != undefined && passengers.length > 0 ? true : false);
              })
               }
               else {

                this.setNewLog(value, passengers != undefined && passengers.length > 0 ? true : false);
               }


          
            }


          }
          else {
            this.setNewLog(value, passengers != undefined && passengers.length > 0 ? true : false);
          }

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

    let radiosNoInteraccion: any[] = [
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
      this.contract.InteraccionPasajero ? radios : radiosNoInteraccion,
      true
    );
  }

  showKilometerModal() {

    let promise: Promise<Boolean> = new Promise<Boolean>((resolve, reject) => {

      const buttons: any[] = [
        {
          text: "Aceptar",
          role: "OK",
          handler: (value: any) => {
            this.kilometraje = value.kilometraje;
            resolve(true);
          },
        },
      ];

      let inputs: any[] = [
        {
          name: 'kilometraje',
          type: 'text',
          placeholder: 'kilometraje'
        }]

      this._alert.showCustomAlert(
        "kilometraje",
        "Digite el kilometraje actual del vehículo",
        "",
        buttons,
        inputs,
        true
      );


    })

    return promise;


  }

  isVip() {
    return !!this._sesion.GetUser() && this._sesion.GetUser().Grupo === "VIP";
  }

  setNewLog(value: any, confirmed: boolean, code: number = 0) {
    if (value != "I" || confirmed == true || !this.contract.UsoCodigo) {
      this.textButton = "Localizando...";
      this.sending = true;
      const log: ServiceRequestDetail = new ServiceRequestDetail();
      log.SolicitudId = this.programming.SolicitudId;
      log.EmpresaId = this._sesion.GetThirdPartie().IdEmpresa;
      log.Estado = value;
      log.firma = this.Firma;
      log.rejectedSign = this.signatureRejected;
      if (code > 0) {
        log.CodigoConfirmacion = code;
      }
      // this._request.SetTransportRequestFailed(log).then(() => {
      this.geo.getCurrentPosition().then((data) => {
        this.textButton = "Esperando...";
        setTimeout(() => {
          log.Latitude = data.coords.latitude;
          log.Longitude = data.coords.longitude;
          log.observations = this.observations;
          log.rejectedSign = this.signatureRejected;
          // Guardamos el intento en los fallidos en caso de que falle        
          if (this.contract.InteraccionPasajero) {
            this._service.PostServicesDetail(log).subscribe(
              (resp: any) => {
                this.sending = false;
                // Borramos el intento ya que el servidor si respondió
                this._request.deleteTransportFailed();
                if (resp.Retorno === 0) {
                  this.textButton = "Nuevo seguimiento";
                  this._alert.showAlert("Perfecto!", "Seguimiento ingresado");
                  this.loadDetail();
                  if (value == "I") {
                    this.getPassengersService();
                  }
                  if (value === 'F') {
                    this.nav.navigateBack("tabs/programming");
                  }
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
          }
          else {
            log.Kilometraje = this.kilometraje;
            this._service.PostServicesDetailNoInteraccion(log).subscribe(
              (resp: any) => {
                this.sending = false;
                // Borramos el intento ya que el servidor si respondió
                this._request.deleteTransportFailed();
                if (resp.Retorno === 0) {
                  this.textButton = "Nuevo seguimiento";
                  this._alert.showAlert("Perfecto!", "Seguimiento ingresado");
                  this.loadDetail();
                  if (value == "I") {
                    this.getPassengersService();
                  }
                  if (value === 'F') {
                    this.nav.navigateBack("tabs/programming");
                  }
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
          }
        }, 3000);
      });
      // })
    }
    else {
      this.showModalCode(value);
    }


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

  getDrivers() {


    if (!this._sesion.isUser()) {

      this.gentercerosService.GetDriversCar(this._sesion.GetThirdPartie().IdEmpresa, this.programming.VehiculoId).subscribe(resp => {
        if (resp != null && resp.Retorno == 0) {

          this.drivers.next(resp.ObjTransaction);
        }
      })

    }

  }

  async showModalCode(value: string) {
    const modal = await this.modalController.create({
      component: ValidateCodePage,
      componentProps: {
        'title': 'Ingresa el código de verificación enviado a su teléfono y/o su email.'
      }
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        // console.log(resp);

        this.setNewLog(value, true, resp.data);
      }
    });
    return await modal.present();
  }

  getPassengersService() {
    this.loading = true;
    this.GENPasajerosService.GetInfoPassengerByService(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(resp => {
        if (resp != null && resp.Retorno == 0) {

          this.programming.GENPasajerosServicios = resp.ObjTransaction;
          // Si no tiene pasajeros detalle, es decir , no usa modelo de pasajeros no muestra el modal
          if (resp.ObjTransaction != null && resp.ObjTransaction != undefined)
            this.showModalGenPassengers();
          else
            this._alert.showAlert('Sin pasajeros', 'El servicio no tiene pasajeros');
        }
      })
  }

  checkPassengers() {

    if (!this._sesion.isUser()) {
      this.GENPasajerosService.GetInfoPassengerByService(this._sesion.GetThirdPartie().IdEmpresa, this.programming.SolicitudId)
        .pipe(finalize(() => {

        }))
        .subscribe(resp => {
          if (resp != null && resp.Retorno == 0) {
            this.programming.GENPasajerosServicios = resp.ObjTransaction;

          }
        })
    }

  }


  async showModalGenPassengers() {
    const modal = await this.modalController.create({
      component: GENPassengersPage,
      componentProps: {
        service: this.programming,
        contract: this.contract,
        freeze: !this.contract.InteraccionPasajero
      }
    });

    modal.onDidDismiss().then(() => {

      this.loadDetail();
    })

    return await modal.present();


  }

  locatePassenger() {

    this.geo.getCurrentPosition().then((data) => {
      this.locating = true;
      setTimeout(() => {
        let curentLocation = { companyId: this.programming.EmpresaId, id: this.programming.SolicitudId, passengerId: this._sesion.GetUser().IdPasajero, latitude: data.coords.latitude, longitude: data.coords.longitude };
        // Guardamos el intento en los fallidos en caso de que falle        
        this.GENPasajerosServiciosService.setPassengerServiceLocation(curentLocation)
          .pipe(finalize(() => {
            this.locating = false;
          }))
          .subscribe(
            (resp: any) => {
              if (resp.Retorno === 0) {

                this._alert.showAlert("Perfecto!", "Ubicación actualizada");
                this.loadDetail();
              } else {
                this._alert.showAlert("Oops!", resp.TxtError);
              }
            },
            (err) => {
              this.locating = false;
              // console.log(err);
            }
          );
      }, 3000);
    });
  }

  locateDriver() {
    this.locating = true;

    this.gessolicitudServiciosService.GetServicesDetail
    this.monitoreoService.GetLastPosition(this.programming.VehiculoId, this.programming.EmpresaId)
      .pipe(
        finalize(() => {
          this.locating = false;
        })
      )
      .subscribe(resp => {
        if (resp != null && resp.Retorno == 0) {
          this.positionService.openMapPosition(resp.ObjTransaction.Latitud, resp.ObjTransaction.Longitud, new Date(),false);
        }
        else {
          this._alert.errorSweet(resp.TxtError);
        }
      })

  }

  changeDriver() {


    if (this.oldDriver == this.programming.ConductorId) {
      this._alert.errorSweet('El conductor no puede ser el mismo.');
      return;
    }



    this._alert.showConfirmationAlert(
      'Cambiar?',
      '¿Se cambiará este servicio de conductor, por el conductor seleccionado, desea continuar?',
      () => {
        // Lógica cuando se confirma.
        this.gessolicitudServiciosService.updateDriver(this.programming.EmpresaId, this.programming.ConductorId, this.programming.SolicitudId).subscribe(resp => {
          if (resp != null && resp.Retorno == 0) {
            this._alert.successSweet('Conductor actualizado!'!);
            this.modalController.dismiss();
            this.nav.navigateBack('tabs/programming');
          }
          else {
            this._alert.errorSweet(resp.TxtError);
          }
        })
      },
      () => {
        // Lógica cuando se cancela (opcional).
        console.log('Acción cancelada.');
        this.modalController.dismiss();
      }
    );
  }



  async showPopupCitiesTarget() {
    const modal = await this.modalController.create({
      component: PoliticalDivisionComponent,
    });
    modal.onDidDismiss().then((resp) => {

      if (resp.data != undefined) {
        this.programming.DestinoCiudad = resp.data.IdDivisionPolitica;
        this.programming.Destino = resp.data.DescripcionCorta;
        let observations = this.SetObservationsTargetChangued();
        this.observations = this.SetObservationsTargetChangued();
        this.gessolicitudServiciosService.ChagueTarget(this.programming.SolicitudId,
          this.programming.DestinoCiudad, this.programming.Destino, this.programming.EmpresaId, observations).subscribe(resp => {
            if (resp != null && resp.Retorno == 0) {
              this._alert.successSweet('Destino actualizado!');
              this.modalController.dismiss();
              this.loadDetail();
              this.targetChanged = true;
            }
            else {
              this._alert.errorSweet(resp.TxtError);
            }
          })

      }
    });
    return await modal.present();
  }

  askForTargetChangued() {
    this._alert.showConfirmationAlert(
      'Cambiar?',
      '¿Se cambiará el destino del servicio,  desea continuar?',
      () => {
        this.showPopupCitiesTarget();
      },
      () => {
        // Lógica cuando se cancela (opcional).
        console.log('Acción cancelada.');
        this.modalController.dismiss();
      }
    );
  }



  SetObservationsTargetChangued() {

    return `Destino cambiado. Destino anterior : ${this.oldTarget.id}-${this.oldTarget.text}.
    Destino actual :  ${this.programming.DestinoCiudad}-${this.programming.Destino}`

  }

  async showModalSignature(value: string, passengers: any[]) {
    const modal = await this.modalController.create({
      component: SignatureComponent,
      componentProps: {
        rejectedAvailable: true,
      }
    });
    modal.onDidDismiss().then(resp => {

      if (resp.data != undefined) {
        if (resp.data == false) {
          this.signatureRejected = true;
        }
        else {
          this.Firma = resp.data;
        }
        this.setNewLog(value, passengers != undefined && passengers.length > 0 ? true : false);
      }



    });
    return await modal.present();
  }

  shouldShowValidatePassengerButton() {
    // Suponemos que cuando no hay usuario (this._sesion.isUser() === false) se está logueando como conductor
    // Y que el contrato debe existir y tener la propiedad PasajerosExternos en true.
    this.showExternPassengerButton = !this._sesion.isUser() && this.contract && this.contract.PasajerosExternos;
  }



  async openValidatePassengerModal() {
    const modal = await this.modalController.create({
      component: ValidCodeComponent,
      componentProps: {
        requestId: this.programming.SolicitudId
      }
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        // console.log(resp);


      }
    });
    return await modal.present();
  }


  createPassengerRegister(typeEntry:string) {
    this.locating=true;   
      this.locating=false;
      let passenger = {
        Id: 0,
        companyId: this._sesion.GetBussiness().CodigoEmpresa,
        RequestId: this.programming.SolicitudId,
        TypeEntry: typeEntry,
        PassengerId: this._sesion.GetUser().IdPasajero,
        Identification: this._sesion.GetUser().Identificacion,
        Longitude:0,
        Latitude: 0

      }

      this.gessolicitudServiciosService.setPassengerRoute(passenger).subscribe(resp=>{
        if(resp.Retorno==0){
          this._alert.successSweet('Pefecto');
        }
        else{
           this._alert.errorSweet(resp.TxtError);
        }
      })

   


  }

}



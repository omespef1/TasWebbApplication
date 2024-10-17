import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { EnlistmentService } from "../../services/enlistment/enlistment.service";
import { SessionService } from "../../services/session/session.service";
import { enlistment } from "src/app/models/enlistmen/enlistmen";
import * as moment from "moment";
import {
  manchecklist,
  manchecklistDetalle,
} from "../../models/enlistmen/manchecklist";
import { vehicle } from "src/app/models/vehicle/vehicle";
import { Router, NavigationExtras } from "@angular/router";
import { ThirdPartie } from "src/app/models/general/user";
import { AlertService } from "../../services/alert/alert.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  NetworkService,
  ConnectionStatus,
} from "../../services/network/network.service";
import { NavController, IonRadioGroup } from "@ionic/angular";
import { AuthService } from "../../services/auth/auth.service";
import { NavigationOptions } from "@ionic/angular/dist/providers/nav-controller";
import { ThirdPartiesService } from "../../services/third-parties/third-parties.service";
import { HttpEventType } from "@angular/common/http";
import { aliparam } from "src/app/models/vehicle/aliparam";
;
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: "app-enlistment",
  templateUrl: "./enlistment.page.html",
  styleUrls: ["./enlistment.page.scss"],
})
export class EnlistmentPage implements OnInit {
  @ViewChildren(IonRadioGroup) divs: QueryList<IonRadioGroup>;
  constructor(
    private _service: EnlistmentService,
    private _sesion: SessionService,
    private router: Router,
    private _alert: AlertService,
    private camera: Camera,
    private geolocation: Geolocation,
    private _network: NetworkService,
    private _nav: NavController,
    private _auth: AuthService,
    private _thirdParties: ThirdPartiesService
  ) {}
  enlistment: enlistment[] = [];
  manchecklist: manchecklist;
  car: vehicle;
  loading = false;
  saving = false;
  snapshot = false;
  progress = 0;
  markedCorrect = false;
  predefined: boolean = false;
  third: ThirdPartie = new ThirdPartie();
  done = false;
  aliparams:aliparam= new aliparam();
  @ViewChild('htmlData',{static:false}) htmlData: ElementRef;

  ngOnInit() {
    //console.log(this.router.getCurrentNavigation().extras);
    this.car = this.router.getCurrentNavigation().extras.state.car;

    this.predefined = false;
    this.third = this._sesion.GetThirdPartie();
    this.aliparams = this.router.getCurrentNavigation().extras.state.params;
    this.GetQuestions();
  }
  ionViewWillEnter() {
    this.third = this._sesion.GetThirdPartie();
  }
  ionViewDidEnter() {
    //console.log('gggsdfsd');
    if (this.done) {
      this._alert.showAlert(
        "Atención",
        "Alistamiento enviado...volviendo al inicio"
      );
      setTimeout(() => {
        this.done = false;
        this._nav.navigateBack("tabs/vehicle");
      }, 2000);
    }
  }
  GetQuestions() {
    this.loading = true;
    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this._service
        .GetQuestions(this._sesion.GetBussiness(), this.third)
        .subscribe((resp) => {
          this.loading = false;
          if (resp.Retorno == 0) {
            this.enlistment = resp.ObjTransaction;
            this._sesion.SetQuestions(this.enlistment);
          }
        });
    } else {
      this.enlistment = this._sesion.GetQuestions();
      this.loading = false;
    }
  }
  MarkPredefined() {
    this.markedCorrect = !this.markedCorrect;
    // this.enlistment[1].respuestaUsuario=1;
    if (this.predefined == true) {
      this.divs.forEach((element) => {
        const index: number = Number(element.name.split("anwser")[1]);
        this.enlistment[index].respuestaUsuario = this.enlistment[
          index
        ].respuesta;
      });
    } else {
      this.divs.forEach((element) => {
        const index: number = Number(element.name.split("anwser")[1]);
        this.enlistment[index].respuestaUsuario = undefined;
      });
    }
  }
  Guardar() {
    
    this.saving = true;
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        
        this.buildPetition(resp.coords.latitude, resp.coords.longitude);
      })
      .catch((error) => {
        //console.log("Error getting location", error);
        this.buildPetition(0, 0);
      });
  }

  async buildPetition(latitude: number, longitude: number) {
    try {
      let answers: manchecklistDetalle[] = [];
      this.saving = true;
      let reviso = "";
      if (this._sesion.GetUser() != undefined && this._sesion.GetUser() != null) {
        reviso = this._sesion.GetUser().NombreCompleto;
      } else {
       reviso = "CONDUCTOR"
      }
      let answer: manchecklist = {
        IdEmpresa: this._sesion.GetBussiness().CodigoEmpresa,
        Id: 0,
        IdVehiculo: this.car.IdVehiculo,
        CentroId: 0,
        FechaProceso: moment(new Date()).format(),
        Estado: "",
        Observaciones: "",
        Acepto: "",
        NumeroViaje: ".",
        Kilometraje: this.car.NuevoKilometraje,
        IdTercero: this.third.IdTercero,
        Reviso: reviso,
        detalle: answers,
        identificacion: this.third.Identificacion,
        Latitude: latitude,
        Longitude: longitude,
        sending: true,
        drivers: [],
        PlacaVehiculo:''
      };
      this._thirdParties.GetThirdParties().forEach((element) => {
        answer.drivers.push(element.IdTercero);
      });
      this.enlistment.forEach((item) => {
        answer.detalle.push({
          IdCheckList: 0,
          Comentario: item.observaciones,
          PNo: item.PNo,
          Pregunta: item.Pregunta,
          Grupo: Number(item.Seccion),
          IdEmpresa: this._sesion.GetBussiness().CodigoEmpresa,
          Respuesta: item.respuestaUsuario,
          Resultado: "",
          Check_Image: item.check_foto,
          show: true,
          HasImage: 0,
        });
      });
  
      if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
        let enviado = false;
        setTimeout(async () => {
          if (!enviado) {
            this._alert.showAlert(
              "Red Lenta",
              "Parece que la red se encuentra un poco lenta. Guardaremos este alistamiento y lo enviaremos por ti cuando haya una mejor calidad de red"
            );
            await this.saveLocal(answer);
            this.goLastEnlisment();
          }
        }, 60000);
        this._service.PostAnswerHeavy(answer).subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            }
            else if (event.type === HttpEventType.Response) {
              enviado = true;
              this.saving = false;
              if (event.body.Retorno == 0) {
                this._alert.showAlert("Mensaje del sistema", `${event.body.message}`);
                this.goLastEnlisment();
    
                this._sesion.SetLastEnlistment(answer);
              } else {
                this._alert.showAlert("Error", event.body.TxtError);
                if (event.body.TxtError == "El conductor no se encuentra activo") {
                  this._auth.signOut();
                }
              }
            }
         
          },
          (err) => {
            this._alert.showAlert("Error de conexión,intente nuevamente.", err);
            this.saving = false;
          }
        );
      } else {
        if (this._service.CheckEnlistment(answer)) {
          answer.Estado = "A";
          this._alert.showAlert(
            "Mensaje del sistema",
            "LA LISTA DE CHEQUEO HA SIDO APROBADA"
          );
        } else {
          answer.Estado = "N";
          this._alert.showAlert(
            "Mensaje del sistema",
            "LA LISTA DE CHEQUEO NO HA SIDO APROBADA"
          );
        }
        this._sesion.SetLastEnlistment(answer);
        this.saving = false;
        await this.saveLocal(answer);
        this.goLastEnlisment();
      }
    } catch (error) {
      this.loading = false;
        this._alert.errorSweet(error);
      
    }
  
  }
  clear(event: any, question: enlistment) {
    if (event.target.nodeName == "ION-RADIO-GROUP") {
      question.observaciones = "";
    }
  }

  async saveLocal(answer: manchecklist) {
    const offlineEnlistemnts = (await this._sesion.GetNewOfflineEnlistment()) as manchecklist[];
    if (offlineEnlistemnts === null || offlineEnlistemnts === undefined) {
      const newList: manchecklist[] = new Array();
      newList.push(answer);
      this._sesion.SetNewOfflineEnlistment(newList);
    } else {
      offlineEnlistemnts.push(answer);
      this._sesion.SetNewOfflineEnlistment(offlineEnlistemnts);
    }
    this._alert.presentToast(
      "Te encuentras Offline o la red está un poco lenta, cuando tengas acceso a una red, enviaremos este alistamiento!",
      5000
    );
  }
  takePicture(answer: enlistment) {
    answer.snapshot = true;
  
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
            answer.snapshot = false;
            answer.check_foto = this.eliminarEncabezadoBase64(reader.result) as string;
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
          answer.snapshot = false;
          answer.check_foto = imageData;
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
  

  // progressUp() {
  //   this.progress += 1;
  // }

  progressValue() {
    // return (this.progress * 100) / this.enlistment.length / 100;
    return (
      (this.enlistment.filter((t) => t.respuestaUsuario > 0).length * 100) /
      this.enlistment.filter((t) => t.Seccion == "0").length /
      100
    );
  }
progressValueUpload(){
  return this.progress;
}
  deletePhoto(answer: enlistment) {
    answer.check_foto = undefined;
  }

  goLastEnlisment() {
    this.done = true;
    this._nav.navigateRoot("tabs/last-enlistments");
  }


}

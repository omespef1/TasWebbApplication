import { Component, OnInit, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { EnlistmentService } from "../../services/enlistment/enlistment.service";
import { SessionService } from "../../services/session/session.service";
import { enlistment } from "src/app/models/enlistmen/enlistmen";
import * as moment from 'moment';
import {
  manchecklist,
  manchecklistDetalle
} from "../../models/enlistmen/manchecklist";
import { vehicle } from "src/app/models/vehicle/vehicle";
import { Router } from "@angular/router";
import { ThirdPartie } from "src/app/models/general/user";
import { AlertService } from "../../services/alert/alert.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  NetworkService,
  ConnectionStatus
} from "../../services/network/network.service";
import { NavController, IonRadioGroup } from "@ionic/angular";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: "app-enlistment",
  templateUrl: "./enlistment.page.html",
  styleUrls: ["./enlistment.page.scss"]
})
export class EnlistmentPage implements OnInit {
  predefined=false;
  @ViewChildren(IonRadioGroup) divs: QueryList<IonRadioGroup>
  constructor(
    private _service: EnlistmentService,
    private _sesion: SessionService,
    private router: Router,
    private _alert: AlertService,
    private camera: Camera,
    private geolocation: Geolocation,
    private _network: NetworkService,
    private _nav: NavController,
    private _auth:AuthService
  ) {}
  enlistment: enlistment[] = [];
  manchecklist: manchecklist;
  car: vehicle;
  loading = false;
  saving = false;
  snapshot = false;
  progress = 0;
markedCorrect=false;
  third: ThirdPartie= new ThirdPartie();

  ngOnInit() {
    console.log(this.router.getCurrentNavigation().extras);
    this.car = this.router.getCurrentNavigation().extras.state.car;
  }
  ionViewWillEnter() {
    this.third = this._sesion.GetThirdPartie();
    this.GetQuestions();
  }
  GetQuestions() {
    this.loading = true;
    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this._service
        .GetQuestions(
          this._sesion.GetBussiness(),
          this.third
        )
        .subscribe(resp => {
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
  MarkPredefined(){
    this.markedCorrect= !this.markedCorrect;
   // this.enlistment[1].respuestaUsuario=1; 
    if(this.predefined==true){ 
        this.divs.forEach(element => {
          const index: number = Number(element.name.split("anwser")[1]);
          this.enlistment[index].respuestaUsuario = this.enlistment[index].respuesta;
        });
    } else {
      this.divs.forEach(element => {
        const index = element.name.split("answer")[1];
        this.enlistment[index].respuestaUsuario = undefined;
      });
    }
  }
  Guardar() {
    this.saving=true;
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.buildPetition(resp.coords.latitude, resp.coords.longitude);
      })
      .catch(error => {
        console.log("Error getting location", error);
        this.buildPetition(0, 0);
      });
  }

  async buildPetition(latitude: number, longitude: number) {
    let answers: manchecklistDetalle[] = [];
    this.saving = true;
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
      Reviso: "CONDUCTOR",
      detalle: answers,
      identificacion: this.third.Identificacion,
      Latitude: latitude,
      Longitude: longitude,
    };
    this.enlistment.forEach(item => {
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
        show:true
      });
    });
    console.log(answer);

    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this._service.PostAnswer(answer).subscribe(resp => {        
        console.log('respuesta es');  
        console.log(resp.Retorno);  
        console.log('la respuesta del chekeo es');
        console.log(resp);
        this.saving = false;
    console.log('activa boton nuevamente');
        if (resp.Retorno == 0) {  
          console.log('respuesta es 0 correctamente'); 

          this._alert.showAlert("Mensaje del sistema", `${resp.message}`);
          this._nav.navigateRoot("tabs/last-enlistments");
          this._sesion.SetLastEnlistment(answer);
        } 
        else {
          console.log('respuesta es 1 correctamente');  
          this._alert.showAlert("Error", resp.TxtError);
          if(resp.TxtError=='El conductor no se encuentra activo'){
            this._auth.signOut();
          }
        }
      },err=> {
        this._alert.showAlert("Error de conexión,intente nuevamente.", err);
        this.saving = false;
      });
    } else {
      if(this._service.CheckEnlistment(answer)){
        answer.Estado='A';
       this._alert.showAlert('Mensaje del sistema','LA LISTA DE CHEQUEO HA SIDO APROBADA');
      }
      else {
        answer.Estado='N';
        this._alert.showAlert('Mensaje del sistema','LA LISTA DE CHEQUEO NO HA SIDO APROBADA');
      }
      this._sesion.SetLastEnlistment(answer);
      this.saving = false;
      const offlineEnlistemnts =   <manchecklist[]> await this._sesion.GetNewOfflineEnlistment();
      if (offlineEnlistemnts == null || offlineEnlistemnts == undefined) {
        console.log(offlineEnlistemnts);
        const newList: manchecklist[] = new Array();
        newList.push(answer);
        console.log("item agregado al offline");
        this._sesion.SetNewOfflineEnlistment(newList);
      } else {
        offlineEnlistemnts.push(answer);
        console.log("item agregado al offline2");
        this._sesion.SetNewOfflineEnlistment(offlineEnlistemnts);
      }
      this._alert.presentToast(
        "Te encuentras Offline, cuando tengas acceso a una red, enviaremos este alistamiento!",5000
      );

      
      // this.router.navigateByUrl("last-enlistments");
      this._nav.navigateRoot("tabs/last-enlistments");
     
    }
  }
  clear(event: any, question: enlistment) {    
    if (event.target.nodeName == "ION-RADIO-GROUP") {     
      question.observaciones = "";
    }
  }
  takePicture(answer: enlistment) {
    answer.snapshot = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        answer.snapshot = false;
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // const base64Image =  imageData;
        answer.check_foto = imageData;
      },
      err => {
        // Handle error
      }
    );
  }

  // progressUp() {
  //   this.progress += 1;
  // }

  // progressValue() {
  //   return (this.progress * 100) / this.enlistment.length / 100;
  // }

  deletePhoto(answer: enlistment) {
    answer.check_foto = undefined;
  }


}

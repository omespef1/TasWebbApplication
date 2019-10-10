import { Component, OnInit } from "@angular/core";
import { EnlistmentService } from "../../services/enlistment/enlistment.service";
import { SessionService } from "../../services/session/session.service";
import { enlistment } from "src/app/models/enlistmen/enlistmen";
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
import { TouchSequence } from "selenium-webdriver";
import {
  NetworkService,
  ConnectionStatus
} from "../../services/network/network.service";

@Component({
  selector: "app-enlistment",
  templateUrl: "./enlistment.page.html",
  styleUrls: ["./enlistment.page.scss"]
})
export class EnlistmentPage implements OnInit {
  constructor(
    private _service: EnlistmentService,
    private _sesion: SessionService,
    private router: Router,
    private _alert: AlertService,
    private camera: Camera,
    private geolocation: Geolocation,
    private _network: NetworkService
  ) {}
  enlistment: enlistment[] = [];
  manchecklist: manchecklist;
  car: vehicle;
  loading = false;
  saving = false;
  snapshot = false;
  ngOnInit() {
    this.GetQuestions();
    console.log(this.router.getCurrentNavigation().extras);
    this.car = this.router.getCurrentNavigation().extras.state.car;
  }
  GetQuestions() {
    this.loading = true;
    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this._service
        .GetQuestions(
          this._sesion.GetBussiness(),
          this._sesion.GetThirdPartie()
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

  Guardar() {
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

  buildPetition(latitude: number, longitude: number) {
    let answers: manchecklistDetalle[] = [];
    this.saving = true;
    let answer: manchecklist = {
      IdEmpresa: this._sesion.GetBussiness().CodigoEmpresa,
      Id: 0,
      IdVehiculo: this.car.IdVehiculo,
      CentroId: 0,
      FechaProceso: new Date(),
      Estado: "",
      Observaciones: "",
      Acepto: "",
      NumeroViaje: ".",
      Kilometraje: this.car.NuevoKilometraje,
      IdTercero: this._sesion.GetThirdPartie().IdTercero,
      Reviso: "",
      detalle: answers,
      identificacion: this._sesion.GetThirdPartie().Identificacion,
      Latitude: latitude,
      Longitude: longitude
    };
    this.enlistment.forEach(item => {
      answer.detalle.push({
        IdCheckList: 0,
        Comentario: "",
        PNo: item.PNo,
        Pregunta: item.Pregunta,
        Grupo: Number(item.Seccion),
        IdEmpresa: this._sesion.GetBussiness().CodigoEmpresa,
        Respuesta: item.respuestaUsuario,
        Resultado: "",
        Check_Image: item.check_foto
      });
    });
    console.log(answer);

    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      this._service.PostAnswer(answer).subscribe(resp => {
        if (resp.Retorno === 0) {
          this._alert.showAlert("Perfecto!", `${resp.message}`);
          this.router.navigateByUrl("last-enlistments");
        } else {
          this._alert.showAlert("Error", resp.TxtError);
        }
      });
    } else {
      let offlineEnlistemnts = this._sesion.GetNewOfflineEnlistment();
      offlineEnlistemnts.push(answer);
      this._sesion.SetNewOfflineEnlistment(offlineEnlistemnts);
      this._alert.showAlert(
        "Error",
        "Te encuentras Offline, cuando tengas acceso a una red, enviaremos este alistamiento!"
      );
      this.router.navigateByUrl("last-enlistments");
    }
  }
  clear(event: any, question: enlistment) {
    console.log(event);
    console.log("limpia");
    if (event.target.nodeName == "ION-RADIO-GROUP") {
      question.observaciones = "";
    }
  }
  takePicture(answer: enlistment) {
    this.snapshot = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.snapshot = false;
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const base64Image = "data:image/jpeg;base64," + imageData;
        answer.check_foto = base64Image;
      },
      err => {
        // Handle error
      }
    );
  }

  deletePhoto(answer: enlistment) {
    answer.check_foto = null;
  }
}

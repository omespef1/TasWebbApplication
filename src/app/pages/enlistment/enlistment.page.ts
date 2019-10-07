import { Component, OnInit } from "@angular/core";
import { EnlistmentService } from "../../services/enlistment/enlistment.service";
import { SessionService } from "../../services/session/session.service";
import { enlistment } from "src/app/models/enlistmen/enlistmen";
import { manchecklist, manchecklistDetalle } from "../../models/enlistmen/manchecklist";
import { vehicle } from "src/app/models/vehicle/vehicle";
import { Router } from "@angular/router";
import { ThirdPartie } from 'src/app/models/general/user';
import { AlertService } from '../../services/alert/alert.service';

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
    private _alert:AlertService
  ) {}
  enlistment: enlistment[] = [];
  manchecklist: manchecklist;
  car: vehicle;
  loading = false;
  saving = false;
  ngOnInit() {
    this.GetQuestions();
  console.log(this.router.getCurrentNavigation().extras)  ;
    this.car = this.router.getCurrentNavigation().extras.state.car;
  }
  GetQuestions() {
    this.loading = true;
    this._service
      .GetQuestions(this._sesion.GetBussiness(), this._sesion.GetThirdPartie())
      .subscribe(resp => {
        this.loading = false;
        if (resp.Retorno == 0) {
          this.enlistment = resp.ObjTransaction;
        }
      });
  }

  Guardar() {
    let answers : manchecklistDetalle [] = [];
    this.saving=true;
    let answer: manchecklist = {
      IdEmpresa: this._sesion.GetBussiness().CodigoEmpresa,
      Id: 0,
      IdVehiculo: this.car.IdVehiculo,
      CentroId: 0,
      FechaProceso: new Date(),
      Estado: "",
      Observaciones: '',
      Acepto: "",
      NumeroViaje: ".",
      Kilometraje: this.car.NuevoKilometraje,
      IdTercero: this._sesion.GetThirdPartie().IdTercero,
      Reviso: "",
     detalle : answers,
     identificacion : this._sesion.GetThirdPartie().Identificacion
    };
    this.enlistment.forEach(item => {
       answer.detalle.push(
         {
           IdCheckList: 0,
           Comentario:'',
           PNo: item.PNo,
           Pregunta: item.Pregunta,
           Grupo: Number(item.Seccion),
           IdEmpresa: this._sesion.GetBussiness().CodigoEmpresa,
           Respuesta: item.respuestaUsuario,
           Resultado: ""
         }
       );
    });
console.log(answer);
  this._service.PostAnswer(answer).subscribe(resp=>{
    if(resp.Retorno===0){
      this._alert.showAlert('Perfecto!',`Se generó la orden ${resp.message}`);
      this.router.navigateByUrl('vehicle');
    }
    else {
      this._alert.showAlert('Error',resp.TxtError);
    }
  })
  }
}

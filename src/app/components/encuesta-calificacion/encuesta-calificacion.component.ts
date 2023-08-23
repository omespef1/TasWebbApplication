import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-calificacion',
  templateUrl: './encuesta-calificacion.component.html',
  styleUrls: ['./encuesta-calificacion.component.scss'],
})
export class EncuestaCalificacionComponent implements OnInit {

  @Input() numeroServicio: number;
  calificacion: number;
  observacion: string;

  constructor() { 


    
  }

  setCalificacion(valor: number) {
    this.calificacion = valor;
    this.observacion = null;
      let req =  {  RequestId : }

  }

  ngOnInit() {}

}

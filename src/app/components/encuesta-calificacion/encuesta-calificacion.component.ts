import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { EncuestaService } from 'src/app/services/encuesta/encuesta.service';

@Component({
  selector: 'app-encuesta-calificacion',
  templateUrl: './encuesta-calificacion.component.html',
  styleUrls: ['./encuesta-calificacion.component.scss'],
})
export class EncuestaCalificacionComponent implements OnInit {

  @Input() programming: any;
  calificacion: number =0;
  observacion: string;

  constructor(public modalController: ModalController,private encuestaService:EncuestaService,
    private alert:AlertService) {}


  setCalificacion(valor: number) {
    this.calificacion = valor;
    this.observacion = null;
  }

  calificar() {
    // Aquí se ejecuta la lógica de calificación.
    console.log('Calificación:', this.calificacion);
    if (this.observacion) {
      console.log('Observación:', this.observacion);
    }

   
    this.alert.showConfirmationAlert(
      'Confirmación', 
      '¿Estás seguro de dar esta calificación?', 
      () => {
        // Lógica cuando se confirma.
        this.encuestaService.setCalification({ Puntuation: this.calificacion, Observation: this.observacion , CompanyId: this.programming.EmpresaId, RequestId: this.programming.SolicitudId }).subscribe(resp=>{
          if(resp!=null && resp.Retorno==0){
            this.alert.successSweet('Hemos enviado su calificación!'!);
            this.modalController.dismiss();
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

  ngOnInit() {}

}

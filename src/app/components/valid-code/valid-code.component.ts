import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { transaction, transactionObj } from 'src/app/models/general/transaction';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-valid-code',
  templateUrl: './valid-code.component.html',
  styleUrls: ['./valid-code.component.scss'],
})
export class ValidCodeComponent implements OnInit {

  verificationCode: number = 0;
  requestId:number=0;
  loading=false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private passengerService: AuthService,
    public modalController: ModalController,
    private alert:AlertService
  )
  
  {
    this.requestId = this.navParams.get('requestId');

  }

  ngOnInit(){


  }

  // Valida que el código tenga exactamente 4 dígitos
  isCodeValid(): boolean {
    return this.verificationCode && this.verificationCode.toString().length === 4;
  }

  validatePassenger() {
    if (!this.isCodeValid()) {
      return;
    }
    this.loading=true;
    // Creamos el payload con el código de verificación.
    let payload = { CodigoVerificacion: this.verificationCode,requestId:this.requestId  };
    // Llamamos al método del servicio que se comunica con la API.
    this.passengerService.validatePassengerPublic(payload)
      .subscribe((resp: transaction) => {
        if (resp && resp.Retorno === 0) {
          // Validación exitosa.
        this.alert.successSweet('Pasajero validado correctamente!');
        this.loading=false;
          this.modalController.dismiss();
        } else {
          // Error en la validación.
          this.loading=false;
          this.alert.errorSweet('Error validando pasajero!');
        }
      }, (err) => {
        this.loading=false;
        alert("Error al validar pasajero");
      });
  }
}

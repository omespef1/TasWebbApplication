import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.page.html',
  styleUrls: ['./validate-code.page.scss'],
})
export class ValidateCodePage implements OnInit {

 
  @Input() title: string;
  number: string;

  ngOnInit(): void {
    
  }

  constructor(private modalController: ModalController,private alert:AlertService) {}

  dismiss() {
    this.modalController.dismiss(this.number);
  }

  validate() {
    // Verifica que el número tenga 4 dígitos y sea numérico
    if (this.number && this.number.length === 4 && /^\d+$/.test(this.number)) {
      // Haz algo con el número válido
      console.log(this.number);
      this.dismiss();
    } else {
      this.alert.showAlert('Error','El código de verificación debe contener únicamente 4 dígitos.');
      
    }
  }

}

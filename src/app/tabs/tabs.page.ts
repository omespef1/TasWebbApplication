import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private alert:AlertService) {}


  showDefaultAlert(){
    this.alert.showAlert('Advertencia','No está configurado para esta empresa')

  }

}

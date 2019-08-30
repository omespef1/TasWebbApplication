import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _alert:AlertController) { }



  async showAlert(title:string,message:string) {
    let alert = await this._alert.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}

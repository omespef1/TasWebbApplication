import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _alert:AlertController,private _toast:ToastController) { }



  async showAlert(title:string,message:string) {
    let alert = await this._alert.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  async presentToast(msg: string, time: number) {
    const toast = await this._toast.create({
      message: msg,
      duration: time,
      position:"bottom",
      closeButtonText:"Cerrar",
      showCloseButton:true,
      translucent:true, 
    });
    toast.present();
  }
}

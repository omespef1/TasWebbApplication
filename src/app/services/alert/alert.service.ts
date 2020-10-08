import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { BrowserTab } from "@ionic-native/browser-tab/ngx";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(
    private _alert: AlertController,
    private _toast: ToastController,
    private browserTab: BrowserTab
  ) {}

  async showAlert(title: string, message: string) {
    let alert = await this._alert.create({
      header: title,
      message: message,
      buttons: ["OK"],
    });
    alert.present();
  }

  async presentToast(msg: string, time: number) {
    const toast = await this._toast.create({
      message: msg,
      duration: time,
      position: "bottom",
      closeButtonText: "Cerrar",
      showCloseButton: true,
      translucent: true,
    });
    toast.present();
  }

  async showCustomAlert(
    header: string,
    subHeader: string,
    message: string,
    buttons: any[],
    inputs: any[],
    animated: boolean
  ) {
    const alert = await this._alert.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      inputs: inputs,
      animated: animated,
    });
    alert.present();
  }

  openBrowserUrl(url: string) {
    console.log(url);
    this.browserTab.isAvailable().then((isAvailable) => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
  }
}

import { Injectable } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import Swal from 'sweetalert2';
@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(
    private _alert: AlertController,
    private _toast: ToastController,
    private browserTab: InAppBrowser
  ) {}

  async showAlert(title: string, message: string) {
    let alert = await this._alert.create({
      header: title,
      message: message,
      buttons: ["OK"],
    });
    alert.present();
  }
  async showBlockMessage(title: string, message: string) {
    let alert = await this._alert.create({
      header: title,
      message: message,
      buttons: [],
      backdropDismiss: false
    });
    alert.present();
  }

  async presentToast(msg: string, time: number,position:'bottom'|'top'|'middle'='bottom') {
    const toast = await this._toast.create({
      message: msg,
      duration: time,
      position: position,
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
    try {
      // console.log(url);
    this.browserTab.create(url, '_system', 'location=yes');
    // this.browserTab.isAvailable().then((isAvailable) => {
    //   if (isAvailable) {
    //     this.browserTab.openUrl(url);
    //   } else {
    //     // open URL with InAppBrowser instead or SafariViewController
    //   }
    // });
    } catch (error) {
      console.log(error);
    }
    
  }
  successSweet(message:string){

    Swal.fire({
      title: 'Perfecto!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }

  
errorSweet(message:string){

    Swal.fire({
      title: 'Oops!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    })
}

async showConfirmationAlert(
  title: string,
  message: string,
  confirmHandler: () => void,
  cancelHandler?: () => void
) {
  const alert = await this._alert.create({
    header: title,
    message: message,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: cancelHandler || (() => {
          console.log('Confirm Cancel');
        })
      }, {
        text: 'Confirmar',
        handler: confirmHandler
      }
    ]
  });

  await alert.present();
}

async showServiceSelectionAlert(
  services: any[],
  confirmHandler: (selectedService: any) => void,
  cancelHandler?: () => void
) {

   const inputs:any = services.map((s, i) => {
    const hora = new Date(s.FechaServicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {    
      type: 'radio',
     label: `${s.Nombre} ${hora }`,
      value: i,
      checked: i === 0,
    };
  });
  const alert = await this._alert.create({
    header: 'Selecciona un servicio',
    subHeader: 'Tienes más de un servicio disponible en este momento',
    inputs: inputs,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: cancelHandler || (() => console.log('Selección cancelada')),
      },
      {
        text: 'Seleccionar',
        handler: (selectedIndex: number) => {
          confirmHandler(services[selectedIndex]);
        },
      },
    ],
  });

  await alert.present();
}
}

import { Injectable } from '@angular/core';
// import { TouchID } from '@ionic-native/touch-id/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Injectable({
  providedIn: 'root'
})
export class TouchIdService {

  constructor(private faio: FingerprintAIO) {
  }
  isAvailale(){
   return this.faio.isAvailable();
  }

  verifyFingerPrint(message:string){
    return this.faio.show({
     title:message,
     cancelButtonTitle:'Cancelar',
     disableBackup:true,
     fallbackButtonTitle:'Usar PIN',
    })
  }

  
}

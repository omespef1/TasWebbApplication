import { Injectable } from '@angular/core';
import { TouchID } from '@ionic-native/touch-id/ngx';

@Injectable({
  providedIn: 'root'
})
export class TouchIdService {

  constructor(private _touch:TouchID) {
  }
  isAvailale(){
    return this._touch.isAvailable();
  }

  verifyFingerPrint(message:string){
    return this._touch.verifyFingerprint(message);
  }
}

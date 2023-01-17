import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private callPlugin:CallNumber) { }



  call(callnumber:string){
    console.log(callnumber);
    this.callPlugin.callNumber(callnumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}

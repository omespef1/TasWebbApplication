import { Injectable } from '@angular/core';
// import { OSNotification, OSNotificationPayload, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _session:SessionService,private oneSignal: OneSignal) {


   }



  init_Notifications(){
    this.oneSignal.startInit('69510a1b-0a47-421d-9baa-12377c1c443c', '94562330671');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    
    this.oneSignal.endInit();

    this.oneSignal.getIds().then(notificationIds=>{
      console.log('77');
      console.log(notificationIds);
      this._session.setOneSignalIds(notificationIds);
    })
  }
}

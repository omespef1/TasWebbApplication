import { Injectable } from '@angular/core';
// import { OSNotification, OSNotificationPayload, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _session:SessionService) {


   }



  // init_Notifications(){
 

  //   window["plugins"].OneSignal.startInit(
  //         "69510a1b-0a47-421d-9baa-12377c1c443c",
  //         "94562330671"
  //       )
  //         .handleNotificationOpened((notificationOpenedCallback) => {
  //           // console.log(notificationOpenedCallback);
  //           // this.open(notificationOpenedCallback);
  //         })
  //         .endInit();

  //         window["plugins"].OneSignal.getIds((notificationIds)=>{
  //           console.log(notificationIds);
  //         this._session.setOneSignalIds(notificationIds);
  //         });   
  // }
}

import { Injectable } from '@angular/core';

import { SessionService } from '../session/session.service';
import OneSignal from 'onesignal-cordova-plugin';
import { platform } from 'os';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _session:SessionService,private platform:Platform) {


   }

   OneSignalInit(): void {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.setLogLevel(6, 0);
  
    if(this.platform.is("cordova")){
    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId("69510a1b-0a47-421d-9baa-12377c1c443c");
    OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  
    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    
    });

  }
}


setExternal (user) {
  if(this.platform.is("cordova")){
    OneSignal.setExternalUserId(user);
  }


}

  // init_Notifications(){
  //   console.log('iniciando notificaciones');
  //   this.oneSignal.startInit('69510a1b-0a47-421d-9baa-12377c1c443c', '94562330671');

  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
  //   this.oneSignal.handleNotificationReceived().subscribe(() => {
  //     console.log('recibiendo notificaciones');
  //    // do something when notification is received
  //   });
    
  //   this.oneSignal.handleNotificationOpened().subscribe(() => {
  //     // do something when a notification is opened
  //   });
    
  //   this.oneSignal.endInit();

  //   this.oneSignal.getIds().then(notificationIds=>{
  //     console.log('77');
  //     console.log(notificationIds);
  //     this._session.setOneSignalIds(notificationIds);
  //   })
  // }
}

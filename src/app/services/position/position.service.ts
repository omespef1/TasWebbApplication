import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocationComponent } from 'src/app/components/location/location.component';

@Injectable({
  providedIn: 'root'
})
export class PositionService {


    constructor(private modalController:ModalController){




    }


    async openMapPosition(lat:number,long:number,time:Date){

        const modal = await this.modalController.create({
            component:  LocationComponent,
            componentProps: {
              'detail': { Latitude:lat,Longitude:long,Time:time}
             
            }
          });
          modal.onDidDismiss().then(resp => {
         
          });
          return await modal.present();
        }
    

}
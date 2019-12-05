import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { AlertService } from '../alert/alert.service';
import { OfflineManagerService } from '../offline/offline-manager.service';

export enum ConnectionStatus {
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
 
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Online);
 
  constructor(private network: Network, private toastController: ToastController, private plt: Platform,private alert:AlertService,
    private _offline: OfflineManagerService) {
    console.log(network.type);
    this.plt.ready().then(() => {
      let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.initializeNetworkEvents();
     
      this.status.next(status);
    });
  }
 
  public initializeNetworkEvents() {
 
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
 
    this.network.onConnect().subscribe(() => {

      setTimeout(() => {
        if (this.network.type === 'wifi') {
         this.alert.presentToast('Conexión WIFI',4000);
        }
        else {
          this.alert.presentToast('Conexión 3G/4G',4000);
        }
      }, 3000);
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
        this._offline.checkEventsPendings();
        
      }
    });
  }
 
  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
 
    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    let toast = this.toastController.create({
      message: `Estás en modo ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
  }
 
  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }
 
  public getCurrentNetworkStatus(): ConnectionStatus {
    let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
    this.updateNetworkStatus(status);
    return this.status.getValue();
  }
}
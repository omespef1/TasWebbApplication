import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

export enum ConnectionStatus {
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
 
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Online);
 
  constructor(private network: Network, private toastController: ToastController, private plt: Platform) {
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
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
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
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { AlertService } from '../alert/alert.service';
import { OfflineManagerService } from '../offline/offline-manager.service';
import { SessionService } from '../session/session.service';

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
    private _offline: OfflineManagerService, private _sesion:SessionService) {
    //console.log(network.type);
    this.plt.ready().then(() => {
      let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.initializeNetworkEvents();
     
      this.status.next(status);
    });
  }
 
  public initializeNetworkEvents() {
 //console.log('inicializa');
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        //console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
    this.network.onConnect().subscribe(() => {
//console.log('evento de recien conectado');
      setTimeout(() => {
        if (this.network.type == 'wifi' && this._sesion.GetWifi()) {
          if (this.status.getValue() === ConnectionStatus.Online) {
            //console.log('WE ARE ONLINE');
            this.updateNetworkStatus(ConnectionStatus.Online);
          }
         this.alert.presentToast('Conexión WIFI permitida',4000);
       
        } else {
          if (this.status.getValue() === ConnectionStatus.Online) {
            //console.log('WE ARE ONLINE');
            this.updateNetworkStatus(ConnectionStatus.Online);
          }
          if (this._sesion.GetMobile() && this._sesion.GetMobile()){
            this.alert.presentToast('Conexión 3G/4G permitida', 4000);
          
          }
        }
      }, 3000); 
    });
  }
 
  private async updateNetworkStatus(status: ConnectionStatus) {
    //console.log('evento actualizacion');
    this.status.next(status);
 
    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    let toast = this.toastController.create({
      message: `Estás en modo ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
    if(status == ConnectionStatus.Online)
      this._offline.checkEventsPendings();
  }
 
  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }
 
  public getCurrentNetworkStatus(): ConnectionStatus {
    //console.log(this.network.type);
    //console.log('obtiene estado conexion actual')
    let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
//return ConnectionStatus.Offline;
    if (this.network.type === 'wifi') {
      if(!this._sesion.GetWifi()){
        //console.log('entra por wifi')
        this.updateNetworkStatus(ConnectionStatus.Offline);
        return ConnectionStatus.Offline;
      }
     } else
      {
      if(!this._sesion.GetMobile()){
        //console.log('entra por mobile')
        this.updateNetworkStatus(ConnectionStatus.Offline);        
        return ConnectionStatus.Offline;
        
      }
     }
     //console.log('actualiza por donde no debe')
     this.updateNetworkStatus(status);
    return this.status.getValue();
  }
}
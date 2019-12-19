import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { enlistment } from "../../models/enlistmen/enlistmen";
import { manchecklist } from "src/app/models/enlistmen/manchecklist";
import { SessionService } from '../../services/session/session.service';
import { NetworkService } from 'src/app/services/network/network.service';
import { ConnectionStatus } from '../../services/network/network.service';

declare var google;

@Component({
  selector: "app-last-enlistments",
  templateUrl: "./last-enlistments.page.html",
  styleUrls: ["./last-enlistments.page.scss"]
})
export class LastEnlistmentsPage implements OnInit {
  mapRef = null;
  showDetail=false;
  showLocation=false;
  loadingMap=false;
  constructor(private _vehicle: VehicleService,private _sesion:SessionService,private _network:NetworkService) {}
  enlistment: manchecklist = new manchecklist();
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    console.log('actualiza');
    this.GetLastEnlistment();
  }


  GetLastEnlistment(event: any= null) {
    if(this._network.getCurrentNetworkStatus()== ConnectionStatus.Online){
      this._vehicle.GetLastEnlistment(this._sesion.GetBussiness(), this._sesion.GetThirdPartie()).subscribe(resp => {
        if(event!=null){
          event.target.complete();
        }
        if (resp.Retorno == 0) {
          this.enlistment = resp.ObjTransaction;
          this.loadMap(this.enlistment.Latitude,this.enlistment.Longitude);
        }

      });
    }
    else {
      this.enlistment = this._sesion.GetLastEnlistment();
      this.loadMap(this.enlistment.Latitude,this.enlistment.Longitude);
    }
  
  }

  
  async loadMap(latitude:number,long:number) {
   this.loadingMap=true;
    const myLatLng = { lat: latitude, lng: long};
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {    
      this.loadingMap=false;
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'último alistamiento'
    });
  }

  


}

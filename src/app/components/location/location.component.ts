
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  theHtmlString: any;
  // latitude: number; long: number;
  detail:any;
  constructor(  private _san: DomSanitizer,private navParams:NavParams,private modalCtrl:ModalController) { 

    this.detail = this.navParams.get("detail");
    
  
  }
 

  ngOnInit() {
  
    // this.loadMap();

    
  }

  openLocation() {
    // Reemplaza las comas si existen
    let lat = this.detail.Latitude.replace(',', '.');
    let long = this.detail.Longitude.replace(',', '.');
    
    // Construye la URL para Google Maps como ejemplo. 
    // La mayoría de las veces, esto desencadenará el comportamiento del selector de aplicaciones si hay múltiples apps que pueden manejar la URL.
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
    
    // Abre la URL
    window.open(url, '_system');
}


  async close(){
    await this.modalCtrl.dismiss();
  }


}

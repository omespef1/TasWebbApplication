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
  latitude: number; long: number;
  constructor(  private _san: DomSanitizer,private navParams:NavParams,private modalCtrl:ModalController) { 

    this.latitude = this.navParams.get("latitude");
    this.long = this.navParams.get("latitude");
    console.log('constructor');
  }
 

  ngOnInit() {
    console.log('init');
this.loadMap();
    
  }



  loadMap() {

    this.theHtmlString = this._san.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${this.latitude}, ${this.long}&z=12&output=embed`
    );
  }

  async close(){
    await this.modalCtrl.dismiss();
  }


}

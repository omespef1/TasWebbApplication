
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



  // loadMap() {

  //   this.theHtmlString = this._san.bypassSecurityTrustResourceUrl(
  //     `https://maps.google.com/maps?q=${this.latitude}, ${this.long}&z=15&output=embed`
  //   );
  // }

  async close(){
    await this.modalCtrl.dismiss();
  }


}

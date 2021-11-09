import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent implements OnInit {
 passengers:any[]=[];
 passengersList:any[]=[];
  constructor(private modalController:ModalController,private navParams:NavParams) { }

  ngOnInit() {
    this.passengers= this.navParams.get('passengers');

  }

  async close(){
    await this.modalController.dismiss();
  }

  filter(event){
    this.passengersList = this.passengers;
    this.passengersList = this.passengers.filter(
      v =>
        v.pasajero.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 ||  v.identification.indexOf(
          event.target.value
    ) > -1);
  }

}

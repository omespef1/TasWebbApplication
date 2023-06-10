import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GENPasajerosServicios } from 'src/app/models/genpasajeroservicios/genpasajerosservicios.model';
import { CallService } from 'src/app/services/call/call.service';

@Component({
  selector: 'app-genpassengers',
  templateUrl: './genpassengers.page.html',
  styleUrls: ['./genpassengers.page.scss'],
})
export class GENPassengersPage implements OnInit {

  passengers: GENPasajerosServicios[] = [];
  passengersList: GENPasajerosServicios[] = [];
  constructor(private modalController: ModalController, private navParams: NavParams,
    private callService: CallService) { }

  ngOnInit() {
    this.passengers = this.navParams.get('passengers');

  }

  async close() {
    await this.modalController.dismiss();
  }

  filter(event) {
    this.passengersList = this.passengers;
    this.passengersList = this.passengers.filter(
      v =>
        v.GENPasajeros.Identificacion.indexOf(
          event.target.value.toUpperCase()
        ) > -1 || v.GENPasajeros.Identificacion.indexOf(
          event.target.value
        ) > -1);
  }



  call(passenger: GENPasajerosServicios) {
    if (!isNaN(passenger.GENPasajeros.Celular)) {
      this.callService.call(passenger.GENPasajeros.Celular.toPrecision());
    }


  }

}

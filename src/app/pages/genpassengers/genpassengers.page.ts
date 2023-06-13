import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { GENPasajerosServicios } from 'src/app/models/genpasajeroservicios/genpasajerosservicios.model';
import { ServiceRequestDetail } from 'src/app/models/service-request/programmings';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CallService } from 'src/app/services/call/call.service';
import { PositionService } from 'src/app/services/position/position.service';
import { ServicesRequestService } from 'src/app/services/services-request/services-request.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-genpassengers',
  templateUrl: './genpassengers.page.html',
  styleUrls: ['./genpassengers.page.scss'],
})
export class GENPassengersPage implements OnInit {
request:any;
  passengers: GENPasajerosServicios[] = [];
  passengersList: GENPasajerosServicios[] = [];
  sending = false;
  constructor(private modalController: ModalController, private navParams: NavParams,
    private callService: CallService,private positionService:PositionService,
    private alert:AlertService,private gessolicitudServicios:ServicesRequestService,private sesion:SessionService,
    private geo: Geolocation,) { }

  ngOnInit() {
    this.request = this.navParams.get('service');
    this.passengers = this.request.passengers;

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

  checkPosition(passenger:GENPasajerosServicios){
    if(!!passenger.PassengerLatitude && !!passenger.PassengerLongitude)
      this.positionService.openMapPosition(passenger.PassengerLatitude,passenger.PassengerLongitude);
      else
      this.alert.showAlert('Oops!','El pasajero no ha compartido su ubicación aún.')

  }



  setNewLog(state:string) {      
    this.sending = true;  
      const log: ServiceRequestDetail = new ServiceRequestDetail();            
        this.geo.getCurrentPosition().then((data) => {        
          setTimeout(() => {
            log.SolicitudId = this.request.SolicitudId;
            log.EmpresaId = this.sesion.GetThirdPartie().IdEmpresa;
            log.Estado = state;
            log.Latitude = data.coords.latitude;
            log.Longitude = data.coords.longitude;                      
            this.gessolicitudServicios.PostServicesDetail(log).pipe(
              finalize(()=>{
                this.sending = false;
              })
            ).subscribe(
              (resp: any) => {               
                if (resp.Retorno === 0) {              
                  this.alert.showAlert("Perfecto!", "Seguimiento ingresado");               
                } else {
                  
                  this.alert.showAlert("Error", resp.TxtError);
                }
              },
              (err) => {
               
                // console.log(err);
              }
            );
          }, 3000);
        },err=>{
          console.log(err);
          this.sending=false;
        });
      
    


  }
}

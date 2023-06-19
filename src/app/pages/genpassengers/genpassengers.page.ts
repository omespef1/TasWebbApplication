import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { GESContratos } from 'src/app/models/contracts/contract.model';
import { GENPasajeros } from 'src/app/models/genpasajeros/genpasajeros.model';
import { GENPasajerosServicios } from 'src/app/models/genpasajeroservicios/genpasajerosservicios.model';
import { ServiceRequestDetail } from 'src/app/models/service-request/programmings';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CallService } from 'src/app/services/call/call.service';
import { GENPasajerosServiciosService } from 'src/app/services/genpasajerosservicios/genpasajerosservicios.service';
import { PositionService } from 'src/app/services/position/position.service';
import { ServicesRequestService } from 'src/app/services/services-request/services-request.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ValidateCodePage } from 'src/app/validate-code/validate-code.page';

@Component({
  selector: 'app-genpassengers',
  templateUrl: './genpassengers.page.html',
  styleUrls: ['./genpassengers.page.scss'],
})
export class GENPassengersPage implements OnInit {
request:any;
  passengers: GENPasajerosServicios[] = [];
  passengersList: GENPasajerosServicios[] = [];
  details:ServiceRequestDetail[];
  sending = false;
  locating = false;
  changing=false;
  allowchange = false;
  allowTake=false;
  contract:GESContratos;
  constructor(private modalController: ModalController, private navParams: NavParams,
    private callService: CallService,private positionService:PositionService,
    private alert:AlertService,private gessolicitudServicios:ServicesRequestService,private sesion:SessionService,
    private geo: Geolocation, private genPasajerosServicios:GENPasajerosServiciosService,private alertController:AlertController,
    private changes:ChangeDetectorRef
   ) {

      this.request = this.navParams.get('service');

      this.passengers = this.request.GENPasajerosServicios;
      this.contract =  this.navParams.get('contract');
      this.details = this.request.details;
  
     }

  ngOnInit() {
   
   this.checkLocked();
   this.checkTake();

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

  checkLocked(){

    if(this.details!= undefined && this.details.find(x=> x.Estado=="I")){
      this.allowchange = false;
    }
    else 
    this.allowchange =true;
  }


  checkTake(){
    if(this.details!= undefined && this.details.find(x=> x.Estado=="I")){
      this.allowTake = true;
    }
    else 
    this.allowTake =false;
  }

  checkPosition(passenger:GENPasajerosServicios){

    this.locating = true;
    this.genPasajerosServicios.GetById(passenger.Id).pipe(
      finalize(()=>{
        this.locating = false;
      })
    ).subscribe(resp=>{
      if(resp!=undefined && resp.Retorno==0){
        passenger = resp.ObjTransaction;
        if(!!passenger.PassengerLatitude && !!passenger.PassengerLongitude)
        this.positionService.openMapPosition(passenger.PassengerLatitude,passenger.PassengerLongitude,passenger.CreaFecha);
        else
        this.alert.showAlert('Oops!','El pasajero no ha compartido su ubicación aún.')
      }
     
    },err=>{
      console.log(err);
    })


  }
  updateOrder(){
       
  }


  
  async showModalCode(state:string,dataPassenger:GENPasajerosServicios) {
    const modal = await this.modalController.create({
      component:  ValidateCodePage,
      componentProps: {
        'title': 'Ingresa el código de verificación enviado a su teléfono y/o su email.'
      }
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        // console.log(resp);
        
        this.setNewLog(state, dataPassenger,resp.data);
      }
    });
    return await modal.present();
  }
  setNewLog(state:string,dataPassenger:GENPasajerosServicios,code:number=0) {     

    this.sending = true;    
      const log: ServiceRequestDetail = new ServiceRequestDetail();            
        this.geo.getCurrentPosition().then((data) => {        
          setTimeout(() => {
            if(code>0){
              log.CodigoConfirmacion = code;
            }
            log.SolicitudId = this.request.SolicitudId;
            log.EmpresaId = this.sesion.GetThirdPartie().IdEmpresa;
            log.Estado = state;
            log.Latitude = data.coords.latitude;
            log.Longitude = data.coords.longitude;  
            log.IdPasajero = dataPassenger.IdPasajero;        
            log.observaciones = dataPassenger.Observaciones;         
            this.gessolicitudServicios.PostServicesDetail(log).pipe(
              finalize(()=>{
                this.sending = false;
               
              })
            ).subscribe(
              (resp: any) => {               
                if (resp.Retorno === 0) {              
                  this.alert.showAlert("Perfecto!", "Seguimiento ingresado");                                                    
                  this.changes.detectChanges();      
                this.modalController.dismiss();                                       

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

  UpdatePassengers(){
    this.changing = true;
    try {
     
      this.validOrders();
          
      
                   
      this.genPasajerosServicios.update(this.passengers)
      .pipe(finalize(()=>{
        this.changing = false;
      }))
      .subscribe(resp=>{
        if(resp!=undefined && resp.Retorno==0){
          this.alert.showAlert('Perfecto!','Orden actualizado!')
        }
      })
    } catch (err) {
      this.changing =false;
      this.alert.showAlert('Error',err);
    }

  }

  validOrders() {
    if(this.passengers!= null &&  !!this.passengers){
      for (let i = 1; i <= this.passengers.length -1; i++) {
        if (!this.passengers.find(x => x.Orden == i))
        throw Error("Orden de pasajeros no válido. Debe haber un orden incremental.");
        if (this.passengers.find(x => x.Orden> this.passengers.length))
        throw Error(`Orden de pasajeros no válido. No puede ser mayor a ${this.passengers.length}`);
        if (this.passengers.find(x => x.Orden == 0))
        throw Error(`Orden de pasajeros no válido. No puede ser 0.`);

        if (this.passengers.filter(x => x.Orden == i).length>1)
        throw Error(`Orden de pasajeros no puede repetirse`);
      }

      
      
    }

  

}


  async askForlog(state:string,dataPassenger:GENPasajerosServicios) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Motivo',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Se encuentra incapacitado',
          value: 'Se encuentra incapacitado'
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Se va por su cuenta',
          value: 'Se va por su cuenta'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'No contesta',
          value: 'No contesta'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Reasignado el turno y/o vuelo',
          value: 'Reasignado el turno y/o vuelo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (selectedValue) => {
            debugger;
            console.log('Confirm Ok', selectedValue);
            dataPassenger.Observaciones = selectedValue; // Suponiendo que Observaciones es el campo donde se debe guardar la información seleccionada
            this.setNewLog(state, dataPassenger); // funcion que contiene el resto del codigo de setNewLog
          }
        }
      ]
    });
  
    await alert.present();
  }
}




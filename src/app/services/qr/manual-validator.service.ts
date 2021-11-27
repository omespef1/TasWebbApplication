import { Injectable } from '@angular/core';
import { transactionObj } from 'src/app/models/general/transaction';
import IPassengerValidator from '../../interfaces/passenger-validator';
import { PassengerService } from '../passenger/passenger.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export default class ManualValidatorService implements IPassengerValidator {
   public identification="";
    constructor(private passengerService:PassengerService,private alertService:AlertService){

    }
    validPassenger(companyId: number, requestId: number): Promise<transactionObj<Boolean>> {
       
      return  this.showIdentificationModal(companyId,requestId);

    }

    uploadPassenger(companyId: number, requestId: number,latitude:number, longitude:number){
      let passenger : any = {  CompanyId: companyId,RequestId : requestId , Identification:  this.identification, Latitude: latitude, Longitude:longitude}
     this.passengerService.setPassenger(passenger).subscribe(resp=>{
         if(resp!= null && resp.Retorno==0){
             this.alertService.successSweet('Pasajero registrado!');
         }
         else {
          this.alertService.errorSweet(resp.TxtError);
         }
     })
  }



    showIdentificationModal(company:number,requestId:number){

            let promise : Promise<transactionObj<Boolean>>  = new Promise<transactionObj<Boolean>>( (resolve, reject) => {

                const buttons: any[] = [
                    {
                      text: "Cancelar",
                      role: "Cancel",
                    },
                    {
                      text: "Validar",
                      role: "OK",
                      handler: (value: any) => {                  
                        this.identification = value.identification; 
                        this.passengerService.checkPassenger(company,requestId,value.identification).subscribe(resp=>{
                           resolve(resp);
                        })
                      },
                    },
                  ];
              
                  let inputs: any[] = [
                    {
                      name: 'identification',
                      type: 'text',
                      placeholder: 'Identificación'
                    }]
              
                  this.alertService.showCustomAlert(
                    "Ingreso Pasajero",
                    "Digite la identificación del pasajero",
                    "",
                    buttons,
                    inputs,
                    true
                  );


            })

            return promise;

     
    }



}
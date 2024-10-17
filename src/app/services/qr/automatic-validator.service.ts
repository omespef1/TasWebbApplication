
import { resolve } from 'url';
import IPassengerValidator from '../../interfaces/passenger-validator';
import { AlertService } from '../alert/alert.service';
import { PassengerService } from '../passenger/passenger.service';
import { transactionObj } from '../../models/general/transaction';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';






export default class QrValidatorService implements IPassengerValidator   {


    public identification:string;
    constructor(private alertService: AlertService, private passengerService: PassengerService,private barcodeScanner: BarcodeScanner) {

    }


   
    validPassenger(companyId: number, requestId: number): Promise<transactionObj<Boolean>> {

        let promise: Promise<transactionObj<Boolean>>  = new Promise<transactionObj<Boolean>>((resolve,reject)=>{
            this.barcodeScanner.scan().then(barcodeData => {
                console.log('Barcode data', barcodeData);
                            this.passengerService.checkPassenger(companyId, requestId, barcodeData.text).subscribe(data => {
                            this.identification = barcodeData.text;
                            if(this.identification.length>0)
                                resolve(data);
                                else {
                                    this.identification="";
                                    reject(false);
                                }
                            })
               }).catch(err => {
                   this.identification="";
                  reject(false);
               });

        })
        return promise;
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

}
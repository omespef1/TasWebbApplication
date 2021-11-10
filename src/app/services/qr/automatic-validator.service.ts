
import { resolve } from 'url';
import IPassengerValidator from '../../interfaces/passenger-validator';
import { AlertService } from '../alert/alert.service';
import { PassengerService } from '../passenger/passenger.service';
import { transactionObj } from '../../models/general/transaction';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';






export default class QrValidatorService implements IPassengerValidator   {


    private identification:string;
    constructor(private alertService: AlertService, private passengerService: PassengerService,private barcodeScanner: BarcodeScanner) {

    }


   
    validPassenger(companyId: number, requestId: number): Promise<transactionObj<Boolean>> {

        let promise: Promise<transactionObj<Boolean>>  = new Promise<transactionObj<Boolean>>((resolve,reject)=>{
  

            this.barcodeScanner.scan().then(barcodeData => {
                console.log('Barcode data', barcodeData);
                
                // this.identification = barcodeData;
                            this.passengerService.checkPassenger(companyId, requestId, "").subscribe(data => {
                                resolve(data);
                            })
               }).catch(err => {
                   console.log('Error', err);
               });

            // this.qrScanner.prepare()
            //     .then((status: QRScannerStatus) => {
            //         if (status.authorized) {
            //             // camera permission was granted


            //             // start scanning
            //             let scanSub = this.qrScanner.scan().subscribe((text: any) => {
            //                 console.log('Scanned something', text);

            //                 this.qrScanner.hide(); // hide camera preview
            //                 scanSub.unsubscribe(); // stop scanning
            //                 this.identification = text;
            //                 this.passengerService.checkPassenger(companyId, requestId, text).subscribe(data => {
            //                     resolve(data);
            //                 })

            //             });

            //         } else if (status.denied) {
            //             // camera permission was permanently denied
            //             // you must use QRScanner.openSettings() method to guide the user to the settings page
            //             // then they can grant the permission from there


            //             let dataData: transactionObj<Boolean> = { ObjTransaction:null, Retorno:1, TxtError:"Oops, parece que no tenemos acceso a la cámara. Dirígete a ajustes de la aplicación y habilita el acceso a la cámara de tu dispositivo." };
            //             resolve(dataData)
            //         } else {
            //             // permission was denied, but not permanently. You can ask for permission again at a later time.
            //             let dataData: transactionObj<Boolean> = { ObjTransaction:null, Retorno:1, TxtError:"Oops, parece que no tenemos acceso a la cámara. Dirígete a ajustes de la aplicación y habilita el acceso a la cámara de tu dispositivo." };
            //             resolve(dataData)


            //         }
            //     })
            //     .catch((e: any) => {

            //         let dataData: transactionObj<Boolean> = { ObjTransaction:false, Retorno:1, TxtError:"Error desconocido" };
            //         resolve(dataData)
            //     });


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
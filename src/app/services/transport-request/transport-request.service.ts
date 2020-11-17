import { Injectable } from '@angular/core';
import { ServiceRequestDetail } from "src/app/models/service-request/programmings";
import { ServicesRequestService } from "../services-request/services-request.service";
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class TransportRequestService {

  constructor(private _service:ServicesRequestService,private _alert:AlertService) { }


  SetTransportRequestFailed(data: ServiceRequestDetail){
    const promise = new Promise((resolve, reject) => {
      let actualData: ServiceRequestDetail[] = [];
      actualData =  JSON.parse(localStorage.getItem('ServiceRequestDetail'));
      if(actualData == null){
        actualData =[];
      }   
      actualData.push(data);
      localStorage.setItem('ServiceRequestDetail', JSON.stringify(actualData));
      resolve();
    });
    return promise;
  }


  deleteTransportFailed(data: ServiceRequestDetail){
    debugger;
    const actualData: ServiceRequestDetail[] = JSON.parse(localStorage.getItem('ServiceRequestDetail'));
    if (actualData !== undefined && actualData !== null && actualData.length > 0) {
      const index: number = actualData.indexOf(data);
      if (index !== -1) {
        // Elimina el elemento
       actualData.splice(index, 1);
       localStorage.setItem('ServiceRequestDetail', JSON.stringify(actualData));
      }
    }
  }
  GetTransportRequestFailed() {

    const promise: Promise<any> = new Promise((resolve, reject) => {
      const actualData: ServiceRequestDetail[] = JSON.parse(localStorage.getItem('ServiceRequestDetail'));
      if (actualData !== undefined && actualData !== null && actualData.length > 0) {
        for (const item of actualData) {
          this._service.PostServicesDetail(item).subscribe(
            (resp: any) => {
              if (resp.Retorno === 0) {
                this._alert.showAlert('Perfecto!', 'Seguimiento ingresado');
                const index: number = actualData.indexOf(item);
                if (index !== -1) {
                  // Elimina el elemento
                  actualData.splice(index, 1);
                }
              } else {
                this._alert.showAlert('Error', resp.TxtError);
              }
            },
            (err) => {
                  console.log('error enviando request');
            }
          );
        }
        resolve();
      }
      else {
        console.log('no hay nada para enviar');
        resolve();
      }
    });
    return promise;
  }

  
}

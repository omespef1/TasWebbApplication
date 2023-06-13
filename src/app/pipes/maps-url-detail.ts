import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'mapsUrlDetail'
})
export class MapsUrlPipeDetail implements PipeTransform {
 constructor(private _san: DomSanitizer){
   
 }
  transform(value: any, ...args: any[]): any {
   let lat:string = value.Latitude;
   let long:string = value.Longitude;
    return this._san.bypassSecurityTrustResourceUrl(       
      `https://maps.google.com/maps?q=${lat.replace(',','.')},${long.replace(',','.')}&z=15&output=embed`
    );
  }

}

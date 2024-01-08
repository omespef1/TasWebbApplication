import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'mapsUrlDetail'
})
export class MapsUrlPipeDetail implements PipeTransform {
 constructor(private _san: DomSanitizer){
   
 }
  transform(value: any, ...args: any[]): any {
    debugger;
   let lat:string = value.Latitude;
   let long:string = value.Longitude;
   if(lat.indexOf(',')>-1)
  lat = lat.replace(',','.')
  if(long.indexOf(',')>-1)
  long = long.replace(',','.')
    return this._san.bypassSecurityTrustResourceUrl(       
      `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`
    );
  }

}

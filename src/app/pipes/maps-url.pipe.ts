import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'mapsUrl'
})
export class MapsUrlPipe implements PipeTransform {
 constructor(private _san: DomSanitizer){
   
 }
  transform(value: any, ...args: any[]): any {
    return this._san.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${value.Latitude},${value.Longitude}&z=15&output=embed`
    );
  }

}

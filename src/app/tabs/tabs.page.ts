import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private alert:AlertService,private _session:SessionService) {}


  showDefaultAlert(){
    this.alert.showAlert('Advertencia','No está configurado para esta empresa')

  }

  isRoutesEnable(){
    if(this._session.GetUser()!= undefined && this._session.GetUser().Grupo=='PASAJERO_RUTA')
    return true;
    else
    return false; 
  }

  isPassenger(){
  if(this._session.GetUser()!= undefined &&this._session.GetUser().Grupo!=undefined)
    return true;
  else 
    return false; 
  }

  getMenu(){
    if(this._session.GetUser()!= undefined &&this._session.GetUser().Grupo=='PASAJERO_RUTA')
      return 'programming-routes';
    else
      return 'programming';
  }
}

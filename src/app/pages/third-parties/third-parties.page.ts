import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { GENTercerosService } from '../../services/GENTerceros/genterceros.service';
import { SessionService } from '../../services/session/session.service';
import { transaction } from '../../models/general/transaction';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { ThirdPartiesService } from '../../services/third-parties/third-parties.service';
import { ThirdPartieValidationPage } from '../third-partie-validation/third-partie-validation.page';
import { loginRequest } from '../../models/general/loginRequest';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-third-parties',
  templateUrl: './third-parties.page.html',
  styleUrls: ['./third-parties.page.scss'],
})
export class ThirdPartiesPage implements OnInit {
  thirdParties:ThirdPartie[]=[];
  thirdPartiesFilter:ThirdPartie[]=[];
  loading=false;
  constructor(private _genTerceros :GENTercerosService,
    private _session: SessionService,
    private _nav:NavController,
    private _thirdParties:ThirdPartiesService,
    private _modal:ModalController,
    private _alert:AlertService) {
      
     }

  ngOnInit() {
    this.GetThirdParties();
  }


   GetThirdParties(){
     this.loading = true;
     const user: ThirdPartie =  this._session.GetUser();
     this._genTerceros.GetGENTerceros(user.IdEmpresa).subscribe((resp: transaction) => {
      this.loading = false;
      if (resp !== undefined && resp.Retorno === 0 ) {
         this.thirdParties = resp.ObjTransaction;
         this.thirdPartiesFilter = this.thirdParties;
       }
   });

  }

  setThirdPartie(thirdPartie: ThirdPartie){
    const thirdParties = this._thirdParties.GetThirdParties();
    if(thirdParties!=undefined && thirdParties.length > 1){
         this._alert.showAlert('Error','No es posible seleccionar más de un conductor');
    }else {
      this.showModalThirdPartieValidation(thirdPartie);
    }

  }

  filterThirdParties(event) {

    this.thirdPartiesFilter = [];
    this.thirdPartiesFilter = this.thirdParties.filter(
      v =>
        v.NombreCompleto.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 ||  v.Identificacion.indexOf(
          event.target.value
    ) > -1);

  }

 async closeModal(){
  this._modal.dismiss();
  }
  async showModalThirdPartieValidation(thirdPartie: ThirdPartie) {

    let validationRequest: loginRequest= new loginRequest();
    validationRequest = {  user : thirdPartie.Identificacion, Password : '', business : Number(thirdPartie.IdEmpresa) };
    const modal = await this._modal.create({
      component: ThirdPartieValidationPage,
      componentProps: {
        thirdPartie: JSON.stringify(validationRequest),
      }
    });
    modal.onDidDismiss().then(()=>{
      console.log('modal cerrado');
      this._nav.navigateRoot("tabs/vehicle");
    });
    return await modal.present();
  }
}

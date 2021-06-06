import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignatureComponent } from '../signature/signature.component';
import { TypeContractsComponent } from '../type-contracts/type-contracts/type-contracts.component';
import { TypeContract } from '../../models/ocasional/type-contract';
import { OcassionalRutesComponent } from '../occasional-rutes/ocassional-rutes/ocassional-rutes.component';
import { OcasionalContract } from '../../models/ocasional/ocasional-contract';
import { PoliticalDivisionComponent } from '../political-division/political-division.component';
import { DivisionPolitical } from '../../models/general/political-division';
import { OcassionalFuec } from '../../models/ocasional/occasional-fuec';


@Component({
  selector: 'app-occasional-fuec',
  templateUrl: './occasional-fuec.page.html',
  styleUrls: ['./occasional-fuec.page.scss'],
})
export class OccasionalFuecPage implements OnInit {
  signatureImg:string;
  constructor(private modal:ModalController) { }
  stage:number=1;
  model: OcasionalContract= new OcasionalContract();
  model2:OcassionalFuec= new OcassionalFuec();
  ngOnInit() {
  }


  async showModalSignature() {
    const modal = await this.modal.create({
      component: SignatureComponent
    });
    modal.onDidDismiss().then(resp => {
     
      console.log(resp);
     this.model.Firma = resp.data;
    });
    return await modal.present();
  }

  async showPopupContracts() {
    const modal = await this.modal.create({
      component: TypeContractsComponent
    });
    modal.onDidDismiss().then(resp => {
     const contratSelected: TypeContract= resp.data;      
    // Asignar al modelo aquí
    });
    return await modal.present();
  }

  async showPopupRoutes() {
    const modal = await this.modal.create({
      component: OcassionalRutesComponent
    });
    modal.onDidDismiss().then(resp => {
     const routeSelected: TypeContract= resp.data;      
    // Asignar al modelo aquí
    });
    return await modal.present();
  }

  
  async showPopupCities() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent
    });
    modal.onDidDismiss().then(resp => {
     const citySelected: DivisionPolitical= resp.data;      
    // Asignar al modelo aquí
    });
    return await modal.present();
  }


  setOcasionalContract(){

    // Cuando finaliza cambiar stage
    this.stage =2;
  }
}

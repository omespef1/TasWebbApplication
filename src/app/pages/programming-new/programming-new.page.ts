import { Component, OnInit } from '@angular/core';
import { GESCentroCostos } from 'src/app/models/service-request/costcenter';
import { ServicesRequest } from '../../models/service-request/programmings';
import { GescentrocostosService } from '../../services/gencentrocostos/gescentrocostos.service';
import { SessionService } from '../../services/session/session.service';
import { ModalController } from '@ionic/angular';
import { PoliticalDivisionComponent } from '../political-division/political-division.component';
import { DivisionPolitical } from 'src/app/models/general/political-division';

@Component({
  selector: 'app-programming-new',
  templateUrl: './programming-new.page.html',
  styleUrls: ['./programming-new.page.scss'],
})
export class ProgrammingNewPage implements OnInit {
   request:ServicesRequest;
   costCenterList:GESCentroCostos[]=[];
   costCenterSelected:GESCentroCostos= new GESCentroCostos();
   cityOrigin:DivisionPolitical= new DivisionPolitical();
   cityTarget:DivisionPolitical= new DivisionPolitical();
  constructor(private costCenterService:GescentrocostosService,private session:SessionService,private modal:ModalController) { }

  ngOnInit() {
  }



  showPopUpModalidad(){
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.costCenterSelected = resp.data;
        this.request.CentrocostosId = this.costCenterSelected.CentrocostosId;
      }
    });
    return await modal.present();
  }


  async showPopupCitiesOrigin() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.cityOrigin = resp.data;
        this.request.OrigenCiudad = this.cityOrigin.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }

  
  async showPopupCitiesTarget() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.request.CentrocostosId = resp.data;
        this.request.CentrocostosId = this.cityTarget.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }
}

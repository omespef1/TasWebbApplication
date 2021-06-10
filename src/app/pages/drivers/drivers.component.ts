import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { ModalController } from '@ionic/angular';
import { ThirdPartiesService } from 'src/app/services/third-parties/third-parties.service';
import { SessionService } from '../../services/session/session.service';
import { GENTercerosService } from '../../services/GENTerceros/genterceros.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {

  dataList: ThirdPartie[]=[];
  data: ThirdPartie[]=[];
  thirdPartie:ThirdPartie;
  loading=false;
  constructor(  
    private modalController: ModalController,
    private thirdPartiesService:GENTercerosService,
    private sesionService:SessionService
  ) {

    this.thirdPartie = this.sesionService.GetThirdPartie();
  }

  ngOnInit() {
    this.GetData();
  }

  GetData() {
    this.loading=true;
    this.thirdPartiesService.GetGENTercerosBank(this.thirdPartie.IdEmpresa).subscribe(resp=>{
      this.loading=false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction!=null) {
        this.dataList = resp.ObjTransaction;
        this.data =resp.ObjTransaction;
      }
    },err=> {
      this.loading=false;

    })       
  }

   async setData(data: ThirdPartie) {
    await this.modalController.dismiss(data);
  }

  async close(){
    await this.modalController.dismiss();
  }

  filter(event){
    this.dataList = this.data;
    this.dataList = this.data.filter(
      v =>
        v.NombreCompleto.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 ||  v.Identificacion.indexOf(
          event.target.value
    ) > -1);
  }


}

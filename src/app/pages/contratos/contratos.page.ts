import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session/session.service';
import { GESContratos } from '../../models/contracts/contract.model';
import { GescentrocostosService } from '../../services/gencentrocostos/gescentrocostos.service';
import { GesContratosService } from '../../services/contratos/contratos.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.page.html',
  styleUrls: ['./contratos.page.scss'],
})
export class ContratosPage implements OnInit {


  dataList: GESContratos[] = [];
  dataListFilter: GESContratos[] = [];

  loading = false;
  constructor(
    private modalController: ModalController,
    private gesContratosService: GesContratosService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   this.getContracts();
  }


  async setData(data: GESContratos) {
    await this.modalController.dismiss(data);
  }

  search(event) {

    this.dataListFilter = [];
    this.dataListFilter = this.dataList.filter(
      v =>
        v.ContratoNombre.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1);

  }


  getContracts(){
    
    console.log(event);
    this.loading = true;
    this.gesContratosService.Get(this.sesionService.GetGetThirdPartieClient().IdEmpresa).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
        this.dataListFilter = resp.ObjTransaction;
      }
    }, err => {
      this.loading = false;

    })
  }





}
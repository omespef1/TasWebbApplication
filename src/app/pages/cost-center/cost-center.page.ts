import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session/session.service';
import { GESCentroCostos } from '../../models/service-request/costcenter';
import { GescentrocostosService } from '../../services/gencentrocostos/gescentrocostos.service';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.page.html',
  styleUrls: ['./cost-center.page.scss'],
})
export class CostCenterPage implements OnInit {

  page = 0;
  dataList: GESCentroCostos[] = [];
  dataListFilter: GESCentroCostos[] = [];
  loading = false;
  constructor(
    private modalController: ModalController,
    private gesCentroCostosService: GescentrocostosService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
   this.getCostCeter();
  }


  async setData(data: GESCentroCostos) {
    await this.modalController.dismiss(data);
  }


  search(event) {
console.log(event);
this.dataListFilter = [];
if(event.detail.value.length>0){
  
    this.dataListFilter = this.dataList.filter(
      v =>
        v.CentrocostosNombre.toUpperCase().indexOf(
          event.detail.value.toUpperCase()
        ) > -1 ||  v.CentrocostosCodigo.toUpperCase().indexOf(
          event.detail.value.toUpperCase()
        ) > -1);
}
else {
  this.page =0;
  this.loadMore();
}
  

  }
  getCostCeter() {


    console.log(event);
    this.loading = true;
    this.gesCentroCostosService.GetCostCenterCompany(this.sesionService.GetThirdPartie()!=undefined?this.sesionService.GetThirdPartie().IdEmpresa: this.sesionService.GetUser().IdEmpresa).subscribe(resp => {
      this.loading = false;
      //console.log(resp);
      if (resp.Retorno === 0 && resp.ObjTransaction != null) {
        this.dataList = resp.ObjTransaction;
        // this.dataListFilter = resp.ObjTransaction;
        this.loadMore();
      }
    }, err => {
      this.loading = false;

    })
  }


  loadMore(event?) {
    // Aumenta la página actual
    this.page++;
  
    // Define la cantidad de elementos a cargar por página
    const itemsPerPage = 10;
  
    // Calcula el índice inicial y final de los elementos a cargar
    const startIndex = (this.page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Aquí llamarías a tu servicio para obtener los datos que corresponden a esta página
    // En este ejemplo, simplemente obtenemos un subconjunto de los datos ficticios que ya tenemos
    const itemsForPage = this.dataList.slice(startIndex, endIndex);
  
    // Agrega los elementos a la matriz items
    this.dataListFilter.push(...itemsForPage);
  
    // Completa el evento de scroll infinito
    if (event) {
      event.target.complete();
    }
  }

}

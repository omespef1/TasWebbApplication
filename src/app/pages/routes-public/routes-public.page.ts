import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GesRutas } from 'src/app/models/gesrutas/gesturas.model';
import { GESRutasService } from 'src/app/services/gesrutas/gesrutas.service';

@Component({
  selector: 'app-routes-public',
  templateUrl: './routes-public.page.html',
  styleUrls: ['./routes-public.page.scss'],
})
export class RoutesPublicPage implements OnInit {
  page = 0;
  dataList: GesRutas[] = [];
  dataListFilter: GesRutas[] = [];
  loading = false;
  companyCode:number=0;
  contractId:number=0;
  constructor(
    private modalController: ModalController,
    private gesRutasService: GESRutasService,
    private navParams:NavParams
  ) {
    this.companyCode= this.navParams.get('companyCode');
    this.contractId = this.navParams.get('contractId');

   }

  ngOnInit() {
   this.getData();
  }


  async setData(data: GesRutas) {
    await this.modalController.dismiss(data);
  }


  search(event) {
console.log(event);
this.dataListFilter = [];
if(event.detail.value.length>0){
  
    this.dataListFilter = this.dataList.filter(
      v =>
        v.RutaNombre.toUpperCase().indexOf(
          event.detail.value.toUpperCase()
        ) > -1 ||  v.RutaId.toString().toUpperCase().indexOf(
          event.detail.value.toUpperCase()
        ) > -1);
}
else {
  this.page =0;
  this.loadMore();
}
  

  }
  getData() {
    console.log(event);
    this.loading = true;
    this.gesRutasService.getRoutes(this.companyCode,this.contractId).subscribe(resp => {
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

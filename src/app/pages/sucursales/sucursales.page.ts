import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session/session.service';
import { GESSucursales } from '../../models/gessucursales/gessucursal.model';
import { GESSucursalesService } from '../../services/sucursales/sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {

  dataList: GESSucursales[] = [];
  dataListFilter
  loading = false;
  constructor(
    private modalController: ModalController,
    private gesSucursalesService: GESSucursalesService,
    private sesionService: SessionService
  ) { }

  ngOnInit() {
    this.getSucursales();
   
  }


  async setData(data: GESSucursales) {
    await this.modalController.dismiss(data);
  }

  search(event) {


    this.dataListFilter = [];
    this.dataListFilter = this.dataList.filter(
      v =>
        v.SucursalNombre.toUpperCase().indexOf(
          event.target.value.toUpperCase()
        ) > -1 ||  v.SucursalCodigo.indexOf(
          event.target.value
    ) > -1);
   
  }


  getSucursales(){
   
    this.loading = true;
    this.gesSucursalesService.get(this.sesionService.GetGetThirdPartieClient().IdTercero,this.sesionService.GetGetThirdPartieClient().IdEmpresa).subscribe(resp => {
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

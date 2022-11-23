import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { SessionService } from '../../services/session/session.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from '../../models/usuarios/user.model';
import { ServicesRequest } from '../../models/service-request/programmings';
import { DivisionPolitical } from 'src/app/models/general/political-division';
import { PoliticalDivisionComponent } from '../political-division/political-division.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-programming-user-new',
  templateUrl: './programming-user-new.page.html',
  styleUrls: ['./programming-user-new.page.scss'],
})
export class ProgrammingUserNewPage implements OnInit {


  user:Usuario= new Usuario();
  request : ServicesRequest = new ServicesRequest();
  cityOrigin: DivisionPolitical = new DivisionPolitical();
  cityTarget: DivisionPolitical = new DivisionPolitical();
  constructor(private _sesion:SessionService,private userService:UsuariosService,   private modal: ModalController,) { }

  ngOnInit() {

    this.userService.get(this._sesion.GetUser().NombreCompleto,this._sesion.GetUser().IdEmpresa).subscribe(resp=>{
      if(resp!=null && resp.Retorno==0){
        debugger;
        this.user = resp.ObjTransaction;
      }
    })
  }

  async showPopupCitiesOrigin() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.cityOrigin = resp.data;
        this.cityTarget = resp.data;
        this.request.OrigenCiudad = this.cityOrigin.IdDivisionPolitica;
        this.request.DestinoCiudad = this.cityOrigin.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }

  async showPopupCitiesTarget() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.cityTarget = resp.data;
        this.request.DestinoCiudad = this.cityTarget.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }




}

import { Component, OnInit } from '@angular/core';
import { EnlistmentService } from '../../services/enlistment/enlistment.service';
import { SessionService } from '../../services/session/session.service';
import { enlistment } from 'src/app/models/enlistmen/enlistmen';

@Component({
  selector: 'app-enlistment',
  templateUrl: './enlistment.page.html',
  styleUrls: ['./enlistment.page.scss'],
})
export class EnlistmentPage implements OnInit {

  constructor(private _service:EnlistmentService,private _sesion:SessionService) { }
  enlistment:enlistment[]= [];
  loading=false;
  ngOnInit() {
    this.GetQuestions();
  }
 GetQuestions(){
   this.loading=true;
 this._service.GetQuestions(this._sesion.GetBussiness(),this._sesion.GetThirdPartie()).subscribe(resp=>{
   this.loading=false;
   if(resp.Retorno==0){
    this.enlistment = resp.ObjTransaction;
   }
   
 })
 }

 Guardar(){

 }
}

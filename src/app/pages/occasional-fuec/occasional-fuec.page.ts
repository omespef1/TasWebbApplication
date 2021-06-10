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
import { OccasionalContractsService } from '../../services/occasional-contracts/occasional-contracts.service';
import { ThirdPartie } from '../../models/general/user';
import { SessionService } from '../../services/session/session.service';
import { NgForm } from '@angular/forms';
import { OcasionalRute } from '../../models/ocasional/rutes';
import { DriversComponent } from '../drivers/drivers.component';
import { vehicle } from '../../models/vehicle/vehicle';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { AllVehiclesComponent } from '../all-vehicles/all-vehicles.component';
import { OccasionalFuecService } from '../../services/occasional-fuec/occasional-fuec.service';
import { AlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'app-occasional-fuec',
  templateUrl: './occasional-fuec.page.html',
  styleUrls: ['./occasional-fuec.page.scss'],
})
export class OccasionalFuecPage implements OnInit {
  signatureImg: string;
  constructor(private modal: ModalController, private ocasionalContract: OccasionalContractsService,
    private sesion: SessionService,private vehicleService:VehicleService,private ocasionalFuec:OccasionalFuecService,
    private alertService:AlertService) {


  this.thirdPartie = this.sesion.GetThirdPartie();
   this.setFirstDriver();
    
  }
  stage: number = 1;
  sendingContract=false;
  sendingFuec=false;
  model: OcasionalContract = new OcasionalContract();
  model2: OcassionalFuec = new OcassionalFuec();
  thirdPartie: ThirdPartie;
  typeContractSelected: TypeContract = new TypeContract();
  citySelected: DivisionPolitical = new DivisionPolitical();
  routeSelected: OcasionalRute = new OcasionalRute();
  firstDriver : ThirdPartie;
  secondDriver : ThirdPartie = new ThirdPartie();
  thirdDriver : ThirdPartie=new ThirdPartie();
  carSelected:vehicle = new vehicle();
  ngOnInit() {

      this.getMyCar();

  }


  setFirstDriver(){
    this.firstDriver = this.thirdPartie;
    this.model2.ConductorId1 = this.firstDriver.IdTercero;
  }

  
  async showModalSignature() {
    const modal = await this.modal.create({
      component: SignatureComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
      console.log(resp);
      this.model.Firma = resp.data;
      }
    });
    return await modal.present();
  }

  async showPopupContracts() {
    const modal = await this.modal.create({
      component: TypeContractsComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
        this.typeContractSelected = resp.data;
        this.model.TipoContratoId = this.typeContractSelected.TipoContratoId;
        // Asignar al modelo aquí
      }
     
    });
    return await modal.present();
  }

  async showPopupRoutes() {
    const modal = await this.modal.create({
      component: OcassionalRutesComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
      this.routeSelected = resp.data;
      this.model2.RutaId = this.routeSelected.RutaId;
      }
      // Asignar al modelo aquí
    });
    return await modal.present();
  }


  async showPopupCities() {
    const modal = await this.modal.create({
      component: PoliticalDivisionComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
      this.citySelected = resp.data;
      this.model.CiudadId = this.citySelected.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }


  async showPopupDrivers() {
    const modal = await this.modal.create({
      component: DriversComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
      this.secondDriver = resp.data;
      this.model2.ConductorId2 = this.secondDriver.IdTercero;
      }
    });
    return await modal.present();
  }
  async showPopupVehicles() {
    const modal = await this.modal.create({
      component: AllVehiclesComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
      this.carSelected = resp.data;
      this.model2.VehiculoId = this.carSelected.IdVehiculo;
      }
    });
    return await modal.present();
  }
  async showPopupDrivers3() {
    const modal = await this.modal.create({
      component: DriversComponent
    });
    modal.onDidDismiss().then(resp => {
      if(resp.data!=undefined){
      this.thirdDriver = resp.data;
      this.model2.ConductorId3 = this.secondDriver.IdTercero;
      }
    });
    return await modal.present();
  }
  setOcasionalContract() {
  this.sendingContract=true; 
  this.model.EmpresaId =     this.thirdPartie.IdEmpresa;
  this.model.Estado = "1"   ;
    this.ocasionalContract.setOcassionalContract(this.model).subscribe(resp=>{
      this.sendingContract = false;
      if(resp.Retorno == 0){
        this.model = resp.ObjTransaction;
        this.stage = 2;
      }
    },err=> {
      console.log(err);
      this.sendingContract = false;
    })
  }

  setOcasionlFuec(){

this.ocasionalFuec.setOccasionalFuec(this.model2).subscribe(resp=>{

  if(resp.Retorno==0){
    this.alertService.showAlert('Perfecto!',`Se ha generado el FUEC ocasional ${resp.ObjTransaction} `);

  }
})

  }

  search() {

    this.ocasionalContract.getOcasionalContracts(this.thirdPartie.IdEmpresa, this.model.Identificacion).subscribe(resp => {

      if (resp.Retorno == 0 && resp.ObjTransaction != null) {

        this.model = resp.ObjTransaction;
      }
      else {
        let id = this.model.Identificacion;
        this.model = new OcasionalContract();
        this.model.Identificacion = id;
      }

    })
  }


  getMyCar(){

    this.vehicleService.getMyCar(this.thirdPartie.IdEmpresa,this.thirdPartie.IdTercero).subscribe(resp=>{
      if(resp.Retorno==0){
          this.carSelected = resp.ObjTransaction;
          this.model2.VehiculoId = this.carSelected.IdVehiculo;
      }
    })
  }

 
}

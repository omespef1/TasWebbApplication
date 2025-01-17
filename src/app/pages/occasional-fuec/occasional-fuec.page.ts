import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavController } from '@ionic/angular';
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
import { Router } from '@angular/router';
import { PoliticalDivisionService } from '../../services/political-division/political-division.service';
import { ContractTypeService } from '../../services/contracts-type/contract-type.service';
import { GENTercerosService } from 'src/app/services/GENTerceros/genterceros.service';


@Component({
  selector: 'app-occasional-fuec',
  templateUrl: './occasional-fuec.page.html',
  styleUrls: ['./occasional-fuec.page.scss'],
})
export class OccasionalFuecPage implements OnInit {
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  constructor(private modal: ModalController, private ocasionalContract: OccasionalContractsService,
    private sesion: SessionService, private vehicleService: VehicleService, private ocasionalFuec: OccasionalFuecService,
    private alertService: AlertService, private router: NavController,
    private politicalService: PoliticalDivisionService,
    private typeContractService: ContractTypeService,private genTercerosService:GENTercerosService) {


    this.thirdPartie = this.sesion.GetThirdPartie();
    this.setFirstDriver();

  }
  driversList:ThirdPartie[]=[];
  stage: number = 1;
  sendingContract = false;
  sendingFuec = false;
  model: OcasionalContract = new OcasionalContract();
  model2: OcassionalFuec = new OcassionalFuec();
  thirdPartie: ThirdPartie;
  typeContractSelected: TypeContract = new TypeContract();
  citySelected: DivisionPolitical = new DivisionPolitical();
  routeSelected: OcasionalRute = new OcasionalRute();
  firstDriver: ThirdPartie;
  secondDriver: ThirdPartie = new ThirdPartie();
  thirdDriver: ThirdPartie = new ThirdPartie();
  carSelected: vehicle = new vehicle();
  monthShortNames = "Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic"
  today = new Date().toISOString();
  existClient=false;
  ngOnInit() {

    this.getMyCar();
    this.loadTravehicle();

  }
  scrollTop() {
    this.ionContent.scrollToTop(300);
  }


  getVehicle(vehicleId:number){


    this.vehicleService.GetVehicleByCompany(this.thirdPartie.IdEmpresa, vehicleId).subscribe(resp=>{
      if (resp.Retorno == 0 && resp.ObjTransaction != null) {
        this.carSelected = resp.ObjTransaction; 
        this.model2.VehiculoId = vehicleId;
        
        if(this.carSelected  != undefined && this.carSelected.ConductorId2!=undefined ){
          this.model2.ConductorId2 = this.carSelected.ConductorId2;
          this.secondDriver = this.driversList.find(x=>x.IdTercero ==this.model2.ConductorId2 && x.IdEmpresa == this.thirdPartie.IdEmpresa )
        }
        else {
          this.model2.ConductorId2=undefined;
          this.secondDriver = undefined;
        }

        if(this.carSelected  != undefined && this.carSelected.ConductorId3!=undefined ){

          this.model2.ConductorId3 = this.carSelected.ConductorId3;  
          this.thirdDriver = this.driversList.find(x=>x.IdTercero ==this.model2.ConductorId3 && x.IdEmpresa == this.thirdPartie.IdEmpresa ) 
        }
        else {
          this.model2.ConductorId3=undefined;
          this.thirdDriver = undefined;
        }
     
       
      
       
      }
    })
  }




  loadTravehicle(){

    this.genTercerosService.GetDriversByCompany(this.thirdPartie.IdEmpresa).subscribe(resp=>{
      if (resp.Retorno == 0 && resp.ObjTransaction != null) {
        this.driversList = resp.ObjTransaction;
      }
    })
  }
  setFirstDriver() {
    this.firstDriver = this.thirdPartie;   
    this.model2.ConductorId1 = this.firstDriver.IdTercero;   
  }


  async showModalSignature() {
    const modal = await this.modal.create({
      component: SignatureComponent
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        // console.log(resp);
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
      if (resp.data != undefined) {
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
      if (resp.data != undefined) {
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
      if (resp.data != undefined) {
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
      if (resp.data != undefined) {
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
      if (resp.data != undefined) {
        this.carSelected = resp.data;
        this.getVehicle(this.carSelected.IdVehiculo);
      }
    });
    return await modal.present();
  }
  async showPopupDrivers3() {
    const modal = await this.modal.create({
      component: DriversComponent
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.thirdDriver = resp.data;
        this.model2.ConductorId3 = this.secondDriver.IdTercero;
      }
    });
    return await modal.present();
  }
  setOcasionalContract() {
    this.sendingContract = true;
    this.model.EmpresaId = this.thirdPartie.IdEmpresa;
    this.model.Estado = "1";
    this.ocasionalContract.setOcassionalContract(this.model).subscribe(resp => {
      this.sendingContract = false;
      if (resp.Retorno == 0) {
        this.model = resp.ObjTransaction;
        this.stage = 2;
        this.scrollTop();
      }
      else {
        this.alertService.showAlert('error',resp.TxtError);
      }
    }, err => {
      // console.log(err);
      this.sendingContract = false;
    })
  }

  setOcasionlFuec() {
    this.sendingFuec = true;
    this.model2.ConvenioId = this.carSelected.PoseedorId;
    this.model2.OcasionalId = this.model.OcasionalId;
    this.model2.EmpresaId = this.thirdPartie.IdEmpresa;
    this.model2.CliDireccion = this.model.Direccion;
    this.model2.CliEmail = this.model.Email;
    this.model2.CliTelefono = this.model.Telefono;
    this.model2.ContratoObjeto = this.model.ContratoObjeto;
    this.model2.ResDocumento = this.model.Identificacion;
    this.model2.ResNombre = this.model.NombreCompleto;
    this.model2.Valor = this.model.Valor;
    this.model2.ResDireccion = this.model.DireccionR;
    this.model2.ResTelefono = this.model.TelefonoR;
    this.model2.TipoContratoId = this.model.TipoContratoId;
    this.ocasionalFuec.setOccasionalFuec(this.model2).subscribe(resp => {
      this.sendingFuec = false;
      if (resp.Retorno == 0) {
        this.alertService.showAlert('Perfecto!', `Se ha generado el FUEC ocasional ${resp.ObjTransaction} `);
        this.router.navigateBack('tabs/fueqs');
      }
      else {
        this.alertService.showAlert('Error', resp.TxtError);
      }
    }, err => {
      this.alertService.showAlert('Error', 'Ocurrió un error inesperado conectabdo el servidor');
    })

  }

  GetPoliticalDivison(id: number) {
    this.politicalService.GetPoliticalDivisionByID(id).subscribe(resp => {
      if (resp.Retorno == 0 && resp.ObjTransaction != null) {
        this.citySelected = resp.ObjTransaction;
      }
    })
  }

  getTypeContract(id: number) {
    this.typeContractService.getTypeContractsById(this.thirdPartie.IdEmpresa, id).subscribe(resp => {
      if (resp.Retorno == 0 && resp.ObjTransaction != null) {
        this.typeContractSelected = resp.ObjTransaction;
      }
    })
  }

  search() {

    this.ocasionalContract.getOcasionalContracts(this.thirdPartie.IdEmpresa, this.model.Identificacion).subscribe(resp => {

      if (resp.Retorno == 0 && resp.ObjTransaction != null) {

        this.model = resp.ObjTransaction;
        this.model.ContratoObjeto = "";
        this.existClient = true;
        this.GetPoliticalDivison(this.model.CiudadId);
        this.getTypeContract(this.model.TipoContratoId);
      }
      else {
        let id = this.model.Identificacion;
        this.model = new OcasionalContract();
        this.model.Identificacion = id;  
        this.existClient = false;
      }

    })
  }


  getMyCar() {
    

    this.vehicleService.getMyCar(this.thirdPartie.IdEmpresa, this.thirdPartie.IdTercero).subscribe(resp => {
      if (resp.Retorno == 0) {              
        this.getVehicle(resp.ObjTransaction.IdVehiculo);
      }
    })
  }

  getTraVehicle(){

    
  }


}

import { Component, OnInit } from '@angular/core';
import { ThirdPartie } from '../../models/general/user';
import { SessionService } from '../../services/session/session.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from '../../models/usuarios/user.model';
import { ServicesRequest } from '../../models/service-request/programmings';
import { DivisionPolitical } from 'src/app/models/general/political-division';
import { ModalController, NavController } from '@ionic/angular';
import { ServicesRequestService } from '../../services/services-request/services-request.service';
import { AlertService } from '../../services/alert/alert.service';
import { ConfiguracionClientesService } from '../../services/configuracion-clientes/configuracion-clientes.service';
import { ConfiguracionClientes } from '../../models/configuracion-clientes/configuracion-clientes.model';
import { GESContratos } from 'src/app/models/contracts/contract.model';
import { CostCenterPage } from '../cost-center/cost-center.page';
import { GESSucursales } from '../../models/gessucursales/gessucursal.model';
import { GESCentroCostos } from '../../models/service-request/costcenter';
import { SucursalesPage } from '../sucursales/sucursales.page';
import { GescentrocostosService } from '../../services/gencentrocostos/gescentrocostos.service';
import { GESSucursalesService } from '../../services/sucursales/sucursales.service';
import { ContratosPage } from '../contratos/contratos.page';
import { GesContratosService } from '../../services/contratos/contratos.service';
import { ZonasRolesService } from 'src/app/services/zonas-roles/zonasroles.service';
import { TypesService } from '../../models/types-services/type-services';
import { TypesVehiclesComponent } from '../types-vehicles/types-vehicles.component';
import { TRATipoVehiculo } from '../../models/types-vehicle/types-vehicle.model';
import { TypesServicesService } from '../../services/types-services/types-service.service';
import { PoliticaDivisionActiveComponent } from '../political-division/politica-division-active/politica-division-active.component';

@Component({
  selector: 'app-programming-user-new',
  templateUrl: './programming-user-new.page.html',
  styleUrls: ['./programming-user-new.page.scss'],
})
export class ProgrammingUserNewPage implements OnInit {

  loading = false;
  user: Usuario = new Usuario();
  client: ThirdPartie;
  request: ServicesRequest = new ServicesRequest();
  cityOrigin: DivisionPolitical = new DivisionPolitical();
  cityTarget: DivisionPolitical = new DivisionPolitical();
  configuracionCliente: ConfiguracionClientes = new ConfiguracionClientes();
  contractSelected: GESContratos = new GESContratos();
  sucursalSelected: GESSucursales = new GESSucursales();
  costCenterSelected: GESCentroCostos = new GESCentroCostos();
  costCenterList: GESCentroCostos[] = [];
  sucursalesList:GESSucursales[]=[];
  contractList:GESContratos[]=[];
  // typeServiceSelected:TypesService=  new TypesService();
  typeVehicleSelected:TRATipoVehiculo= new TRATipoVehiculo();
  typesServicesList:TypesService[]= [];
  today= new Date();

  constructor(private _sesion: SessionService, private userService: UsuariosService, private modal: ModalController, private requestService: ServicesRequestService,
    private alert: AlertService, private nav: NavController, private configuracionClientesService: ConfiguracionClientesService,
    private costCenterService: GescentrocostosService, private gessucursalesService: GESSucursalesService,
    private gesContratosService:GesContratosService,
    private zonasRolesService:ZonasRolesService,
    private typesServicesService:TypesServicesService) { }

  async ngOnInit() {
    this.getContractsList();
    this.GetClient();    
    this.loadDefaultUserData();
    this.getTypesServices();
    
  }

  GetClient(){
    this.zonasRolesService.get(this._sesion.GetUser().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.client = resp.ObjTransaction;
        this._sesion.SetThirdPartieClient(this.client);
        this.getConfiguration();
        this.request.ClienteId = this.client.IdTercero;
        this.request.NumeroVuelo="0";
        this.request.EmpresaId = this._sesion.GetUser().IdEmpresa;
        
      
       
    
    // this.fillDefaultProperties();  
      }
      else {
        this.alert.errorSweet(resp.TxtError);
      }
    })

  }


  loadDefaultUserData() {
    this.userService.get(this._sesion.GetUser().NombreCompleto, this._sesion.GetUser().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.user = resp.ObjTransaction;

      }
      else {
        this.alert.errorSweet(resp.TxtError);
      }
    })
  }

  async getTypesServices(){
    this.typesServicesService.Get(this._sesion.GetUser().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.typesServicesList = resp.ObjTransaction;
      }
      else {
        this.alert.errorSweet(resp.TxtError);
      }
    })
    }
  

  async getContractsList(){
  let resp = await   this.gesContratosService.Get(this._sesion.GetUser().IdEmpresa).toPromise();
  if (resp != null && resp.Retorno == 0) {
    this.contractList = resp.ObjTransaction;      
  }
  else {
    this.alert.errorSweet(resp.TxtError);
  }
  }

  getCostCenter() {
    this.costCenterService.GetCostCenterCompany(this._sesion.GetUser().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.costCenterList = resp.ObjTransaction;
        if(this.costCenterList.filter(c=>c.CentrocostosId == this.request.CentrocostosId).length>0)
        this.costCenterSelected = this.costCenterList.filter(c=>c.CentrocostosId == this.request.CentrocostosId)[0];
      }
      else {
        this.alert.errorSweet(resp.TxtError);
      }
    })
  }
  getSucursales() {
    this.gessucursalesService.get(this.client.IdTercero,this._sesion.GetUser().IdEmpresa).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        this.sucursalesList = resp.ObjTransaction;
        if(this.sucursalesList.filter(c=>c.SucursalId == this.request.SucursalId).length>0)
        this.sucursalSelected = this.sucursalesList.filter(s=>s.SucursalId == this.request.SucursalId)[0];
        
      }
      else {
        this.alert.errorSweet(resp.TxtError);
      }
    })
  }




  getConfiguration() {
    this.configuracionClientesService.get(this._sesion.GetUser().IdEmpresa, this.client.IdTercero, 21).subscribe(resp => {
      if (resp != null && resp.Retorno == 0) {
        
        this.configuracionCliente = resp.ObjTransaction;
        this.request.CentrocostosId = this.configuracionCliente.CentroCostosId;
        this.request.SucursalId = this.configuracionCliente.SucursalId;
        this.request.ContratoId = this.configuracionCliente.ContratoId;
        this.request.typeRequest ="M";
        this.request.Estado="S";
        
        this.request.UsuarioCelular =  this.user.Celular==undefined?"":  this.user.Celular.toString();
        this.request.UsuarioServicio = `${this.user.Cedula} - ${this.user.Usuario}`;
        this.request.UsuarioVip =  this._sesion.GetUser().NombreCompleto;   
        this.request.UsuarioEmail = this.user.Email;

        if(this.costCenterList.filter(c=>c.CentrocostosId == this.request.CentrocostosId).length>0)
        this.costCenterSelected = this.costCenterList.filter(c=>c.CentrocostosId == this.request.CentrocostosId)[0];
        if(this.contractList.filter(c=>c.ContratoId == this.request.ContratoId).length>0)
        this.contractSelected = this.contractList.filter(c=>c.ContratoId == this.request.ContratoId)[0];
        
        this.getSucursales();
        this.getCostCenter();    
        
      
      }
      else {
        this.alert.errorSweet(resp.TxtError);
      }
    })
  }

  async showPopupCitiesOrigin() {
    const modal = await this.modal.create({
      component: PoliticaDivisionActiveComponent,
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
      component: PoliticaDivisionActiveComponent,
    });
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {
        this.cityTarget = resp.data;
        this.request.DestinoCiudad = this.cityTarget.IdDivisionPolitica;
      }
    });
    return await modal.present();
  }

  FinalizeService() {
    this.loading = true;

    try {
      this.request.UsuarioVip = this._sesion.GetUser().NombreCompleto;
      this.requestService.PostServiceManualService(this.request).subscribe((resp) => {
        this.loading = false;
        if (resp != null && resp.Retorno == 0) {
          this.alert.successSweet("Servicio terminado!");
          this.nav.navigateForward("tabs/programming");
          this.request = new ServicesRequest();
        } else {
          this.alert.showAlert("Error", resp.TxtError);

        }
      });

    } catch (error) {
      this.alert.showAlert('Sistema', error);
    }

  }

  async showPopupContracts() {
    const modal = await this.modal.create({
      component: ContratosPage
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        
        this.contractSelected = resp.data;
        this.request.ContratoId = this.contractSelected.ContratoId;
        // Asignar al modelo aquí
      }

    });
    return await modal.present();
  }


  async showPopupCostCenter() {
    const modal = await this.modal.create({
      component: CostCenterPage
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.costCenterSelected = resp.data;
        this.request.CentrocostosId = this.costCenterSelected.CentrocostosId;
        // Asignar al modelo aquí
      }

    });
    return await modal.present();
  }


  async showPopupTypesVehicles(){
    const modal = await this.modal.create({
      component: TypesVehiclesComponent,
      componentProps: {
        ContratoId: this.request.ContratoId,
      }
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.typeVehicleSelected = resp.data;
        this.request.TipoVehiculoId = this.typeVehicleSelected.IdTipoVehiculo;
        // Asignar al modelo aquí
      }
    });
    return await modal.present();

  }


  async showPopupSucursals() {
    const modal = await this.modal.create({
      component: SucursalesPage
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data != undefined) {
        this.sucursalSelected = resp.data;
        this.request.SucursalId = this.sucursalSelected.SucursalId;
        // Asignar al modelo aquí
      }

    });
    return await modal.present();
  }

  fillDefaultProperties(){


  
  
    
    // console.log(this.contractSelected);
  }
}

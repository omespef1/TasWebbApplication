

export class ServicesRequest {

  constructor(){
    this.SolicitudId=0;
    this.GESSolicitudServiciosDetalle=[];
    this.OrigenCiudad=0;
    this.DestinoCiudad=0;
    this.CentrocostosId=0;
    this.Firma="";
    this.OrigenDireccion="";
    this.DestinoDireccion="";
    this.guid =  Math.random() + new Date().getMilliseconds();
    this.NumeroPasajeros =1;
    this.typeRequest="";
    this.IdTipoServicio =0;
   this.IdPasajero = 0;
    
  }
  EmpresaId: number;
  SolicitudId: number;
  FechaSolicitud: Date;
  ClienteId: number;
  ContratoId: number;
  SucursalId: number;
  CentrocostosId: number;
  FechaServicio: Date;
  HoraServicio: Date;
  UsuarioServicio: string;
  UsuarioCelular: string;
  OrigenDireccion: string;
  OrigenCiudad: number;
  DestinoDireccion: string;
  DestinoCiudad: number;
  NumeroVuelo: string;
  TipoVehiculoId: number;
  VehiculoId: number;
  ConductorId: number;
  Observaciones: string;
  Estado: string;
  UsuarioCrea: string;
  FechaCrea: Date;
  UsuarioModifica: string;
  FechaModifica: Date;
  Firma:string;
  GESSolicitudServiciosDetalle:ServiceRequestDetail[];
  guid:any;
  NumeroPasajeros:number;
  typeRequest:string;
  UsuarioEmail:string;
  UsuarioVip:string;
  IdTipoServicio:number;
  IdPasajero?:number;
  ObservCliente?:string;
  IdVinculacionRutas?:number;
  OrigenID?:number;
  DestinoID?:number;
}

export class ServiceRequestDetail {
  Id: any;
  EmpresaId: number;
  SolicitudId: number;
  Latitude: number;
  Longitude: number;
  Estado: string;
  UsuarioCrea: string;
  FechaCrea: Date;
  UsuarioModifica: string;
  FechaModifica: Date;
  observations:string;
  Kilometraje:number;
  CodigoConfirmacion?:number;
  IdPasajero?:number;
  observaciones?:string;
  rejectedSign?:boolean;
  firma?:string;

}
 
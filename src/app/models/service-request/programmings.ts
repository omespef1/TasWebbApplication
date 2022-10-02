

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

}
 
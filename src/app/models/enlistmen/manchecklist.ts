export class manchecklist {
  IdEmpresa: number;
  Id: number;
  IdVehiculo: number;
  IdTercero: number;
  FechaProceso: string;
  Reviso: string;
  Estado: string;
  Observaciones: string;
  Acepto: string;
  NumeroViaje: string;
  Kilometraje: number;
  CentroId: number;
  detalle: manchecklistDetalle[];
  identificacion:string;
  Latitude:number;
  Longitude:number;
}
export class manchecklistDetalle {
constructor(){
  this.show=true;
}
  IdEmpresa:number;
  IdCheckList:number;
  PNo:number;
  Pregunta:string;
  Respuesta:number;
  Comentario:string;
  Grupo:number;
  Resultado:string;
  Check_Image:string;
  show:boolean;
}
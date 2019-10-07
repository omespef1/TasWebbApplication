export class manchecklist {
  IdEmpresa: number;
  Id: number;
  IdVehiculo: number;
  IdTercero: number;
  FechaProceso: Date;
  Reviso: string;
  Estado: string;
  Observaciones: string;
  Acepto: string;
  NumeroViaje: string;
  Kilometraje: number;
  CentroId: number;
  detalle: manchecklistDetalle[];
  identificacion:string;
}
export class manchecklistDetalle {

  IdEmpresa:number;
  IdCheckList:number;
  PNo:number;
  Pregunta:string;
  Respuesta:string;
  Comentario:string;
  Grupo:number;
  Resultado:string;
}
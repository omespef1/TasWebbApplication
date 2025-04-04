export interface GESSolicitudServiciosPuntosControl {
    Id: number;
    IdEmpresa: number;
    SolicitudId: number;
    IdDivisionPolitica: number;
    Latitude: string;
    Longitude: string;
    FechaChequeo: Date;
    ImageUrl: string;
    Kilometraje?: number;
    FechaCrea: Date;
    UsuarioCrea: string;
  }

  export interface DtoPointControl {

    PointId:number;
    RequestId:number;
    Name:string;
    ImageUrl:string;
    Notas:string;
    CompanyCode:number;
    Latitude:number;
    Longitude:number;
  }
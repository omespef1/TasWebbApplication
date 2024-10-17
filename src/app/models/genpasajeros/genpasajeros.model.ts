export class GENPasajeros {
    IdPasajero: number;
    IdEmpresa: number;
    Identificacion: string;
    NombreCompleto: string;
    Mail: string;
    Celular: number;
    Activo: boolean;
    CreaUsuario: string;
    CreaFecha: Date;
    UsuarioModifica: string;
    ModificaFecha: Date;
    GENPasajerosInfoPropia?:GENPasajerosInfoPropia;
    Vip: boolean;
    PassKey: string;
  
    constructor() {
      this.IdPasajero = 0;
      this.IdEmpresa = 0;
      this.Identificacion = '';
      this.NombreCompleto = '';
      this.Mail = '';
      this.Celular = 0;
      this.Activo = false;
      this.CreaUsuario = '';
      this.CreaFecha = null;
      this.UsuarioModifica = '';
      this.ModificaFecha = null;
      this.Vip = false;
      this.PassKey = '';
    }
  }
  export class GENPasajerosInfoPropia {
    Id: number;
    IdPasajero: number;
    IdEmpresa: number;
    Direccion: string;
    IdDivisionPoliticaEmpresas: number;
    Barrio: string;
    IdMunicipio?: number;
    Cliente: number;
    CreaUsuario?: string;
    CreaFecha?: Date;
    ModificaUsuario?: string;
    ModificaFecha?: Date;
    GENPasajeros?: GENPasajeros;
    DivisionPoliticaEmpresas?: DivisionPoliticaEmpresas;
}
export class DivisionPoliticaEmpresas {
  Id: number;
  IdEmpresa: number;
  IdDivisionPolitica: number;
  DescripcionCorta: string;
  DescripcionLarga: string;
  Estado: boolean;         
}

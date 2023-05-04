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
    GESSolicitudServicios: GESSolicitudServicios[];
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
      this.GESSolicitudServicios = [];
      this.Vip = false;
      this.PassKey = '';
    }
  }
  
  export class GESSolicitudServicios {
    // Define las propiedades de esta clase según su definición en C#
  }
  
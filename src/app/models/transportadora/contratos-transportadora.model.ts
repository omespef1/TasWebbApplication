
export class GENContratosTransportadora {
    EmpresaId: number; // smallint maps to number
    TransportadoraId: number; // DECIMAL(13,0) maps to number, consider precision if needed
    ContratoId: number; // INT maps to number
    IntegracionId: number | null; // INT maps to number, nullable
    UsuarioCrea: string; // varchar maps to string
    FechaCrea: Date; // datetime maps to Date
    UsuarioModifica: string | null; // varchar maps to string, nullable
    FechaModifica: Date | null; // datetime maps to Date, nullable
  
    constructor(
      EmpresaId: number,
      TransportadoraId: number,
      ContratoId: number,
      IntegracionId: number | null,
      UsuarioCrea: string,
      FechaCrea: Date,
      UsuarioModifica?: string,
      FechaModifica?: Date
    ) {
      this.EmpresaId = EmpresaId;
      this.TransportadoraId = TransportadoraId;
      this.ContratoId = ContratoId;
      this.IntegracionId = IntegracionId;
      this.UsuarioCrea = UsuarioCrea;
      this.FechaCrea = FechaCrea;
      this.UsuarioModifica = UsuarioModifica || null;
      this.FechaModifica = FechaModifica || null;
    }
  }
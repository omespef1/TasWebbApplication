export class OcassionalFuec {

    EmpresaId: number;
    FuecOId: number;
    OcasionalId: number;
    ConsecutivoEC: number;
    TipoContratoId:number;
    NumeroFuec: string;
    RutaId: number;
    Origen: string;
    Destino: string;
    Observaciones: string;
    FechaInicial: Date;
    FechaFinal: Date;
    VehiculoId: number;
    ConductorId1: number;
    ConductorId2: number;
    ConductorId3: number;
    ConvenioId: number;
    Impreso: number;
    FechaModifica: Date;
    UsuarioModifica: string;
    ContratoObjeto:string;
    CliDireccion:string;
    CliTelefono:string;
    CliEmail:string;
    ResDocumento:string;
    ResNombre:string;
    ResDireccion:string;
    ResTelefono:string;
    Valor:number;
    constructor(){
        this.RutaId=0;
    }

}
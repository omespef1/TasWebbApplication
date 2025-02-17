export interface GesRutas {

    EmpresaId:number;
    RutaId:number;
    RutaNombre:string;
    Descripcion:string;
    RutaEstado:string;
    TerrotorialId:number;
    IdTipoServicio:number;

}

export interface GESRutasPuntosEncuentro {
    Id:number;
    IdEmpresa:number;
    IdRuta:number;
    NombrePuntoEncuentro:string;
    Estado:boolean;
}
import { business } from './../business/business';

export class ThirdPartie {
    IdEmpresa: number;
    IdTercero: number;
    NombreCompleto: string;
    Identificacion: string;
    NombreRazon:string;
    PrimerApellido:string;
    Grupo;
    TerFechaVenceLicencia:Date;
    Bancario:number;
    Conductor:number;
    IdPasajero?:number;
}


export class ThirdPartieWithCompany extends ThirdPartie {
  CodigoEmpresa: number;
  NombreEmpresa: string;
  Estado: number;
  EmpresaSigla: string;
  LogoApp?:string;
  LogoAppHori?:string;

}

export class ThirdPartiePublic extends ThirdPartie {
   
    Dominio:string;
    ContratoId:number;
}

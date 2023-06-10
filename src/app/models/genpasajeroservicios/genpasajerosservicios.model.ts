import { GENPasajeros } from "../genpasajeros/genpasajeros.model";

export class GENPasajerosServicios {
    Id: number;
    IdEmpresa: number;
    SolicitudId: number;
    IdPasajero: number;
    HoraEstimada?: string;
    Orden?: number;
    CreaUsuario?: string;
    CreaFecha?: Date;
    ModificaUsuario?: string;
    ModificaFecha?: Date;
    GENPasajeros?: GENPasajeros; // Esto necesita ser una clase definida en tu TypeScript
    CodigoVerificacion: number;
}
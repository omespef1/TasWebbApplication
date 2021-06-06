export interface transaction {

    TxtError:string;
    Retorno:number;
    ObjTransaction:any;
}
export class transactionObj<t> {

    TxtError:string;
    Retorno:number;
    ObjTransaction:t;
}

export interface transactionID {
    TxtError:string;
    Retorno:number;
    message:string;

}
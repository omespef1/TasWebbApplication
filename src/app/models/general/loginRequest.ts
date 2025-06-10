export class loginRequest {
    user:string;
    Password:string;
    business:number;
}


export class changePassword {

    idEmpresa:number;
    identificacion:string;
    password:string;
    newPassword:string;
    reNewPassword:string;
    isPassenger:boolean;
    constructor(){
        this.idEmpresa=0;
        this.identificacion="";
        this.newPassword="";
        this.password="";
        this.isPassenger=false;
    }
}
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
    constructor(){
        this.idEmpresa=0;
        this.identificacion="";
        this.newPassword="";
        this.password="";
    }
}
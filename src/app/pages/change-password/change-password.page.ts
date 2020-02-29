import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../../services/alert/alert.service';
import { NgForm, FormArray } from '@angular/forms';
import { SessionService } from '../../services/session/session.service';
import { changePassword } from "src/app/models/general/loginRequest";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changePassword:changePassword = new changePassword();
  showPassword=false;
  showNewPassword=false;
  showReNewPassword=false;
  sending=false;
  constructor(private _login:AuthService,private _alert:AlertService,private _sesion:SessionService) { }

  ngOnInit() {
  }
changePasswordUser(form:NgForm){
  

  this.sending=true;
  this.changePassword.idEmpresa = this._sesion.GetBussiness().CodigoEmpresa;
  this.changePassword.identificacion = this._sesion.GetThirdPartie().Identificacion;

  this._login.changePassword(this.changePassword).subscribe(resp=>{
    this.sending=false;
    if(resp.Retorno==0){
      form.reset();
      this._alert.showAlert('Listo!','Contraseña cambiada exitosamente');
    }
    else {
      this._alert.showAlert('Error!',resp.TxtError);
    }
  },err=>{
    
    this.sending=false;
  })

}


  
}

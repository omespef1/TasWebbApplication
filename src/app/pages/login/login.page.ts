import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { loginRequest } from "../../models/general/loginRequest";
import { NavController } from "@ionic/angular";
import { AlertService } from "../../service/alert/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  showPass=false;
  user: loginRequest = new loginRequest();
  constructor(
    private auth: AuthService,
    private router: Router,
    private _alert: AlertService,
    private _nav: NavController
  ) {}

  ngOnInit() {}

  signIn() {
    this.user.emp_codi = 1;
    this.loading = true;
    console.log(this.user);
    this.auth.signIn(this.user).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      if (resp.result == 1) {
 
        this._alert.showAlert("Ingreso fallido", `${resp.errorMessage}`);
      }
    },err=> {
      this.loading=false;
      this._alert.showAlert('Error',err);
    });
  }


}

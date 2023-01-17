import { Component, OnInit } from "@angular/core";
import { loginRequest } from "../../models/general/loginRequest";
import { AuthService } from "../../services/auth/auth.service";
import { ThirdPartiesService } from "../../services/third-parties/third-parties.service";
import { AlertService } from "../../services/alert/alert.service";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-third-partie-validation",
  templateUrl: "./third-partie-validation.page.html",
  styleUrls: ["./third-partie-validation.page.scss"],
})
export class ThirdPartieValidationPage implements OnInit {
  constructor(
    private auth: AuthService,
    private _thirdParties: ThirdPartiesService,
    private _alert: AlertService,
    private _nav: NavParams,
    private _modal: ModalController
  ) {
    this.thirdValidation = JSON.parse(this._nav.get("thirdPartie"));
  }
  thirdValidation: loginRequest = new loginRequest();
  loading = false;
  valiadted = false;
  showPass=false;
  ngOnInit() {}
  validateThirdPartie() {
    this.loading = true;
    this.auth.validThirdPartie(this.thirdValidation).subscribe((resp) => {
      this.loading = false;
      if (resp != null && resp.Retorno === 0) {
        const existe = this._thirdParties
          .GetThirdParties()
          .filter(d => d.IdTercero == resp.ObjTransaction.IdTercero);
          // console.log(existe);
        if (existe != undefined && existe.length > 0){
          this._alert.showAlert("Error", "Tercero ya agregado");
        }
        else {
          this.valiadted = true;
          this._thirdParties.addThirdPartie(resp.ObjTransaction);
          this._alert.showAlert("Perfecto", "Tercero agregado!");
          this.closeModal();
        }
        // this.closeModal();
      } else {
        this.valiadted = false;
        this._alert.showAlert("Error", "Credenciales no válidas");
      }
    });
  }

 async closeModal() {
    await this._modal.dismiss();
  }
}

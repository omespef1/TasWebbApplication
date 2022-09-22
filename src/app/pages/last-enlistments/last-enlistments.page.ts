import { Component, OnInit, Sanitizer } from "@angular/core";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { enlistment } from "../../models/enlistmen/enlistmen";
import { manchecklist } from "src/app/models/enlistmen/manchecklist";
import { SessionService } from "../../services/session/session.service";
import { NetworkService } from "src/app/services/network/network.service";
import { ConnectionStatus } from "../../services/network/network.service";

declare var google;
import { DomSanitizer } from "@angular/platform-browser";
import { last } from "rxjs/operators";
import { manchecklistDetalle } from "../../models/enlistmen/manchecklist";
import { Router } from "@angular/router";
import { AlertService } from '../../services/alert/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-last-enlistments",
  templateUrl: "./last-enlistments.page.html",
  styleUrls: ["./last-enlistments.page.scss"],
})
export class LastEnlistmentsPage implements OnInit {
  mapRef = null;
  showDetail = false;
  showLocation = false;
  loadingMap = false;
  theHtmlString: any;
  loading = false;
  lastQuestions: enlistment[];
  showBack = false;
  constructor(
    private _vehicle: VehicleService,
    private _sesion: SessionService,
    private _network: NetworkService,
    private _san: DomSanitizer,
    private router: Router,
    private _alert:AlertService,
    private _nav:NavController
  ) {}
  enlistment: manchecklist = new manchecklist();
  groupEnlistment = false;
  ngOnInit() {
    //this.GetLastEnlistment();
  }

  ionViewDidLoad() {
    //console.log('carga extras');
    this.showBack = this.router.getCurrentNavigation().extras.state.showBack;
    //console.log(this.showBack);
  }
  ionViewWillEnter() {
    if (this.validAccess()) {
      this.groupEnlistment = this._sesion.getGroupEnlistment();
      this.GetLastEnlistment();
      this.lastQuestions = this._sesion.GetQuestions();
    }
  }

  SetVisibilityItems() {
    this.enlistment.detalle.forEach((item) => {
      if (item.Respuesta > 0) {
        if (this.groupEnlistment) {
          item.show = false;
        } else {
          item.show = true;
        }
      }
    });
  }

  FixEnlistment(items: manchecklistDetalle[]) {
    items.forEach((element) => {
      element.Grupo = Math.trunc(element.PNo);
      if (!this.groupEnlistment) {
        element.show = true;
      }
    });
  }
  async GetLastEnlistment(event: any = null) {
    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      if (event == null) this.loading = true;
      this._vehicle
        .GetLastEnlistment(
          this._sesion.GetBussiness(),
          this._sesion.GetThirdPartie()
        )
        .subscribe((resp) => {          
          if (event != null) {
            event.target.complete();
          } else {
            this.loading = false;
          }
          if (resp.Retorno == 0) {
            this.enlistment = resp.ObjTransaction;
            this.FixEnlistment(this.enlistment.detalle);
            this.loadMap(this.enlistment.Latitude, this.enlistment.Longitude);

            this.enlistment.detalle.forEach((element) => {
              this.GetManCheckListDetalle(element);
            });
          }
        });
    } else {
      this.enlistment = <manchecklist>await this._sesion.GetLastEnlistment();
      this.FixEnlistment(this.enlistment.detalle);
      //console.log(this.enlistment.detalle);

      if (event != null) {
        event.target.complete();
      }
      this.loadMap(this.enlistment.Latitude, this.enlistment.Longitude);
    }

    //console.log(this.enlistment);
  }

  loadMap(latitude: number, long: number) {
    this.loadingMap = true;

    this.theHtmlString = this._san.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${latitude}, ${long}&z=15&output=embed`
    );

    this.loadingMap = false;

    // const myLatLng = { lat: latitude, lng: long};
    // const mapEle: HTMLElement = document.getElementById('map');
    // this.mapRef = new google.maps.Map(mapEle, {
    //   center: myLatLng,
    //   zoom: 12
    // });
    // google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
    //   this.loadingMap=false;
    //   this.addMaker(myLatLng.lat, myLatLng.lng);
    // });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: "último alistamiento",
    });
  }

  CheckCorrectAnswer(answer: any) {
    if (this.lastQuestions != undefined) {
      const validAnswer = this.lastQuestions.filter(
        (t) => t.PNo == answer.PNo
      )[0];
      let answerString: string = answer.Respuesta;
      if (answerString == validAnswer.respuesta.toString()) return true;
    }
  }

  isGroupCorrect(answer: manchecklistDetalle) {
    let valid: Boolean = true;
    if (this.lastQuestions != undefined && this.lastQuestions != null) {
      let GroupAnswers = this.enlistment.detalle.filter(
        (f) => f.Grupo == answer.Grupo && f.Respuesta > 0
      );
      if (GroupAnswers != null && GroupAnswers != undefined) {
        GroupAnswers.forEach((element) => {
          const validAnswer = this.lastQuestions.filter(
            (t) => t.PNo == element.PNo
          )[0];
          if (
            element.Respuesta.toString() != validAnswer.respuesta.toString() &&
            validAnswer.Restringe == 1
          ) {
            valid = false;
          }
        });
      }
      return valid;
    } else {
      return valid;
    }
  }

  showItems(element: manchecklistDetalle) {
    this.enlistment.detalle
      .filter((p) => p.Grupo == element.Grupo)
      .forEach((element) => {
        element.show = !element.show;
      });
  }

  async GetManCheckListDetalle(detalle: manchecklistDetalle) {
    this._vehicle
      .GetManCheckListDetalle(
        detalle.IdEmpresa,
        detalle.IdCheckList,
        detalle.PNo.toString()
      )
      .subscribe((resp) => {
        detalle.Check_Image =
          "data:image/jpeg;base64," + resp.ObjTransaction.Check_Image;
      });
  }

  validAccess():boolean {
    console.log('valid access');
    if (this._sesion.isUser()) {
      console.log('valid accessssss');
      console.log(this._sesion.GetUser());
      if (this._sesion.GetUser().Grupo !== "SUPERVISOR") {
        this._alert.showAlert("Acceso no autorizado","No se encuentra autorizado para acceder a esta sección");
        if (this._sesion.GetUser().Grupo == "BENEFICIARIO") {
          this._nav.navigateRoot("tabs/programming");
        }
        if (this._sesion.GetUser().Grupo == "CLIENTE") {
          this._nav.navigateRoot("tabs/programming");
        }

        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  
  }
}

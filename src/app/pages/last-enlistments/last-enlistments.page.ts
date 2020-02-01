import { Component, OnInit, Sanitizer } from "@angular/core";
import { VehicleService } from "../../services/vehicle/vehicle.service";
import { enlistment } from "../../models/enlistmen/enlistmen";
import { manchecklist } from "src/app/models/enlistmen/manchecklist";
import { SessionService } from "../../services/session/session.service";
import { NetworkService } from "src/app/services/network/network.service";
import { ConnectionStatus } from "../../services/network/network.service";

declare var google;
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { last } from "rxjs/operators";
import { manchecklistDetalle } from "../../models/enlistmen/manchecklist";

@Component({
  selector: "app-last-enlistments",
  templateUrl: "./last-enlistments.page.html",
  styleUrls: ["./last-enlistments.page.scss"]
})
export class LastEnlistmentsPage implements OnInit {
  mapRef = null;
  showDetail = false;
  showLocation = false;
  loadingMap = false;
  theHtmlString: any;
  loading = false;
  lastQuestions: enlistment[];
  constructor(
    private _vehicle: VehicleService,
    private _sesion: SessionService,
    private _network: NetworkService,
    private _san: DomSanitizer
  ) {}
  enlistment: manchecklist = new manchecklist();
  groupEnlistment = false;
  ngOnInit() {
    //this.GetLastEnlistment();
  }

  ionViewWillEnter() {
    console.log("actualiza");
    this.groupEnlistment = this._sesion.getGroupEnlistment();
    this.GetLastEnlistment();
    this.lastQuestions = this._sesion.GetQuestions();
    console.log(this.lastQuestions);
  }

  async GetLastEnlistment(event: any = null) {
    if (this._network.getCurrentNetworkStatus() == ConnectionStatus.Online) {
      if (event == null) this.loading = true;
      this._vehicle
        .GetLastEnlistment(
          this._sesion.GetBussiness(),
          this._sesion.GetThirdPartie()
        )
        .subscribe(resp => {
          console.log(resp);
          if (event != null) {
            event.target.complete();
          } else {
            this.loading = false;
          }
          if (resp.Retorno == 0) {
            this.enlistment = resp.ObjTransaction;
            this.loadMap(this.enlistment.Latitude, this.enlistment.Longitude);
          }
        });
    } else {
      this.enlistment = <manchecklist>await this._sesion.GetLastEnlistment();
      console.log(this.enlistment);
      if (event != null) {
        event.target.complete();
      }
      this.loadMap(this.enlistment.Latitude, this.enlistment.Longitude);
    }
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
      title: "último alistamiento"
    });
  }

  CheckCorrectAnswer(answer: any) {
    if (this.lastQuestions != undefined) {
      const validAnswer = this.lastQuestions.filter(
        t => t.PNo == answer.PNo
      )[0];
      let answerString: string = answer.Respuesta;
      if (answerString == validAnswer.respuesta.toString()) return true;
    }
  }

  isGroupCorrect(answer: manchecklistDetalle) {
  
    let valid: Boolean = true;
    let GroupAnswers = this.enlistment.detalle.filter(
      f => f.Grupo == answer.Grupo && answer.Respuesta>0
    );
    if (
      GroupAnswers != null &&
      GroupAnswers != undefined     
    ) {
      GroupAnswers.forEach(element => {
        const validAnswer = this.lastQuestions.filter(
          t => t.PNo == answer.PNo
        )[0];
        if (element.Respuesta.toString() != validAnswer.respuesta.toString()) {
          valid = false;
        }
      });
      return valid;
    }
   
    
  }
}

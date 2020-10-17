import { Component, OnInit } from "@angular/core";
import { ServicesRequestService } from "../../services/services-request/services-request.service";
import { SessionService } from "../../services/session/session.service";
import { NavigationExtras } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ThirdPartie } from 'src/app/models/general/user';

@Component({
  selector: "app-programming",
  templateUrl: "./programming.page.html",
  styleUrls: ["./programming.page.scss"],
})
export class ProgrammingPage implements OnInit {
  programmings: any[] = [];
  loading = false;
  constructor(
    private _serviceRequest: ServicesRequestService,
    private _session: SessionService,
    private nav: NavController
  ) {}

  ngOnInit() {
   
  }
  ionViewWillEnter(){
  
    this.GetProgramming();
  }
  GetProgramming(event: any = null) {
    this.loading = true;
    this._serviceRequest
      .GetServicesRequest(
        this._session.GetThirdPartie().IdEmpresa,
        this._session.GetThirdPartie().IdTercero
      )
      .subscribe((resp) => {
        if (event) {
          event.target.complete();
        }
        this.loading = false;
        if (resp.ObjTransaction) {
          this.programmings = resp.ObjTransaction;
        }
      });
  }

  goProgrammingDetail(data: any) {
    let params: NavigationExtras = {
      state: {
        programming: data,
      },
    };
    this.nav.navigateForward("tabs/programming/programming-detail", params);
  }
}

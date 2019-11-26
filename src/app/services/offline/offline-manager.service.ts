import { Injectable } from "@angular/core";
import { Observable, from, of, forkJoin } from "rxjs";
import { switchMap, finalize } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AlertService } from "../alert/alert.service";
import { SessionService } from "../session/session.service";
import { manchecklist } from "../../models/enlistmen/manchecklist";
import { EnlistmentService } from "../enlistment/enlistment.service";
const STORAGE_REQ_KEY = "storedreq";

interface StoredRequest {
  url: string;
  type: string;
  data: any;
  time: number;
  id: string;
}

@Injectable({
  providedIn: "root"
})
export class OfflineManagerService {
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController,
    private alert: AlertService,
    private sesion: SessionService,
    private enlistment: EnlistmentService,
  
  ) {}

  checkForEvents(): Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        let storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              let toast = this.toastController.create({
                message: `Local data succesfully synced to API!`,
                duration: 3000,
                position: "bottom"
              });
              toast.then(toast => toast.present());

              this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          console.log("no local events to sync");
          return of(false);
        }
      })
    );
  }

  storeRequest(url, type, data) {
    let toast = this.toastController.create({
      message: `Your data is stored locally because you seem to be offline.`,
      duration: 3000,
      position: "bottom"
    });
    toast.then(toast => toast.present());

    let action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5)
    };
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);

      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    let obs = [];

    for (let op of operations) {
      console.log("Make one request: ", op);
      let oneObs = this.http.request(op.type, op.url, op.data);
      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }

  checkEventsPendings() {
    this.alert.presentToast('Sincronizando alistamientos...',5000)
    let pendings: manchecklist[] = this.sesion.GetNewOfflineEnlistment();    
    for (const pending of pendings) {
      this.enlistment.PostAnswer(pending).subscribe(resp => {
        if (resp.Retorno === 0) {
          pendings = pendings.filter(obj => obj !== pending);
          this.alert.showAlert("Mensaje del sistema", `${resp.message}`);
        } else {
          this.alert.showAlert("Error", resp.TxtError);
        }
      });
    }

    this.sesion.SetNewOfflineEnlistment(pendings);
  }
}

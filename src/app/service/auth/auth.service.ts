import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject, observable } from "rxjs";
import { filter, tap, take, map } from "rxjs/operators";
import { transaction } from "src/app/models/general/transaction";
import { HttpManagerService } from "../httpManager/http-manager.service";
import { loginRequest } from '../../models/general/loginRequest';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private router: Router,
    private _http: HttpManagerService,
  ) {
    this.loadUser();
  }

  loadUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  signIn(credentials: loginRequest) {
    console.log(credentials);
    return this._http.Post<transaction>("/login", credentials).pipe(
      tap(async (userData: transaction) => {
        if (userData) {
          if (userData.result === 0) {
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      })
    );
  }

  async signOut() {
   // await this.storage.set("user", null);
    this.router.navigateByUrl("/login");
  }
}

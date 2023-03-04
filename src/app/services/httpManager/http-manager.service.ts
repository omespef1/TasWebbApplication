import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpEventType,
  HttpEvent
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map, tap } from "rxjs/operators";
import { config } from "src/assets/config/settings";

@Injectable({
  providedIn: "root"
})
export class HttpManagerService {
baseUrl:string;
progress=0;
  private httpOptions: {
    headers: HttpHeaders;
  };
  strToken = "";
  constructor(private _http: HttpClient) {

this.baseUrl = config.url;
  }

  Get<T>(urlController: string) {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };

    let options: any = {
      headers: new HttpHeaders(headerDict),
      observe: "body"
    };
//console.log(`${this.baseUrl}${urlController}`);
    return this._http
      .get<T>(`${this.baseUrl}${urlController}`, <object>options)
      .pipe(
        tap(resp=>{
          console.log(resp);
          retry(3), // reintenta la petición 3 veces
          catchError(err => this.handleError(err)) // then handle the error
        })
      
      );

    // return call;
  }

  Post<T>(urlController: string, body: any) {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    let bodyRequest: any = {
      headers: new HttpHeaders(headerDict)
    };
    console.log(`${this.baseUrl}${urlController}`);
    console.log(body);
    return this._http
      .post<T>(`${this.baseUrl}${urlController}`, body, <object>bodyRequest)
      .pipe(
        tap(resp=>{
          //console.log(resp);
          catchError(err => this.handleError(err))      
        })
        
        );
  }

  private handleError(error: HttpErrorResponse) {
    //console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("Ocurrió un error:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      "Ocurrió un error inesperado.Inténtelo nuevamente más tarde"
    );
  }


  PostRequest<T>(urlController: string, body: any) {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    const bodyRequest: any = {
      headers: new HttpHeaders(headerDict)
    };
    console.log(`${this.baseUrl}${urlController}`);
    console.log(body);
    return this._http
      .post<T>(`${this.baseUrl}${urlController}`, body, <object>bodyRequest)
      .pipe(
        tap(resp => {
          retry(5);
          catchError(err => this.handleError(err))
        })
        );
  }


  PostRequestHeavy<T>(urlController: string, body: any): Observable<HttpEvent<T>> {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    };
    const bodyRequest: any = {
      headers: new HttpHeaders(headerDict),
      reportProgress: true, // Habilitar seguimiento del progreso,
      observe: 'events'
    };
    console.log(`${this.baseUrl}${urlController}`);
    console.log(body);
    return this._http
      .request<T>('POST', `${this.baseUrl}${urlController}`, {
        body,
        ...bodyRequest
      })   
  }




}

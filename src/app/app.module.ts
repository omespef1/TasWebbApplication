import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//Modulos
import { ComponentsModule } from "./components/components.module";
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { SafePipe } from './pipes/safe.pipe';
import { BrowserTab } from "@ionic-native/browser-tab/ngx";
import { ThirdPartiesGenericPage } from './pages/third-parties-generic/third-parties-generic.page';
import { SignatureComponent } from './pages/signature/signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx"

@NgModule({
  declarations: [AppComponent, SafePipe,ThirdPartiesGenericPage,SignatureComponent,PassengersComponent],
  entryComponents: [ThirdPartiesGenericPage,SignatureComponent,PassengersComponent],
  imports: [BrowserModule, IonicModule.forRoot(
   { mode: 'ios'}
  ), AppRoutingModule,
  ComponentsModule,HttpClientModule, IonicStorageModule.forRoot(),SignaturePadModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) ],
  providers: [
    Network,
    FingerprintAIO,
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    BrowserTab,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

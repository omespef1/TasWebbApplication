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
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { SafePipe } from './pipes/safe.pipe';
import { ThirdPartiesGenericPage } from './pages/third-parties-generic/third-parties-generic.page';
import { SignatureComponent } from './pages/signature/signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx"
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { FactoryValidator } from './factory/validator-passenger.factory';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { PoliticalDivisionComponent } from './pages/political-division/political-division.component';
import { CostCenterPage } from './pages/cost-center/cost-center.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ThirdPartieValidationPage } from "./pages/third-partie-validation/third-partie-validation.page";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent, SafePipe,ThirdPartiesGenericPage,SignatureComponent,PassengersComponent,PoliticalDivisionComponent,CostCenterPage,ThirdPartieValidationPage],
  entryComponents: [ThirdPartiesGenericPage,SignatureComponent,PassengersComponent,PoliticalDivisionComponent,CostCenterPage,ThirdPartieValidationPage],
  imports: [BrowserModule, IonicModule.forRoot(
   { mode: 'ios'}
  ), AppRoutingModule,
  ComponentsModule,HttpClientModule,FormsModule, IonicStorageModule.forRoot(),SignaturePadModule],
  providers: [
    Network,
    // FingerprintAIO,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    BarcodeScanner,
    OneSignal,
    FactoryValidator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

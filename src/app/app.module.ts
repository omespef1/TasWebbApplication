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
import { CostCenterClientPage } from './pages/cost-center-client/cost-center-client.page';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ThirdPartieValidationPage } from "./pages/third-partie-validation/third-partie-validation.page";
import { FormsModule } from '@angular/forms';
import { SucursalesPage } from './pages/sucursales/sucursales.page';
import { ContratosPage } from './pages/contratos/contratos.page';
import { TypesVehiclesComponent } from './pages/types-vehicles/types-vehicles.component';
import { PoliticaDivisionActiveComponent } from './pages/political-division/politica-division-active/politica-division-active.component';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { ValidateCodePage } from "./validate-code/validate-code.page";
import { GENPassengersPage } from "./pages/genpassengers/genpassengers.page";
import { LocationComponent } from "./components/location/location.component";
import { MapsUrlPipeDetail } from "./pipes/maps-url-detail";
import { EncuestaCalificacionComponent } from "./components/encuesta-calificacion/encuesta-calificacion.component";
import { PoliticaDivisionNewComponent } from "./pages/political-division/political-division-new/politica-division-new.component";


@NgModule({
  declarations: [AppComponent, SafePipe, ThirdPartiesGenericPage, SignatureComponent, PassengersComponent, PoliticalDivisionComponent, CostCenterPage, ThirdPartieValidationPage, SucursalesPage,
     ContratosPage, TypesVehiclesComponent, PoliticaDivisionActiveComponent,PoliticaDivisionNewComponent, ValidateCodePage, GENPassengersPage,LocationComponent,MapsUrlPipeDetail,EncuestaCalificacionComponent,CostCenterClientPage],
  entryComponents: [ThirdPartiesGenericPage, SignatureComponent, PassengersComponent, PoliticalDivisionComponent, CostCenterPage,CostCenterClientPage, ThirdPartieValidationPage, SucursalesPage, ContratosPage, TypesVehiclesComponent, PoliticaDivisionActiveComponent,
     ValidateCodePage,GENPassengersPage, LocationComponent,EncuestaCalificacionComponent,PoliticaDivisionNewComponent],
  imports: [BrowserModule, IonicModule.forRoot(
    { mode: 'ios' }
  ), AppRoutingModule,
    ComponentsModule, HttpClientModule, FormsModule, IonicStorageModule.forRoot(), SignaturePadModule],
  providers: [
    Network,
    // FingerprintAIO,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    BarcodeScanner,
    OneSignal,
    CallNumber,
    FactoryValidator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

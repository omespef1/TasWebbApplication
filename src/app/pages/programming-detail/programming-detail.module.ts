import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProgrammingDetailPage } from './programming-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { DxAccordionModule, DxCheckBoxModule, DxSliderModule, DxTagBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatesRequestProgrammingPipe } from "src/app/pipes/states-request-programming.pipe";
import { MapsUrlPipe } from "src/app/pipes/maps-url.pipe";
const routes: Routes = [
  {
    path: '',
    component: ProgrammingDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DxAccordionModule,
    DxCheckBoxModule,
    DxSliderModule,
    DxTagBoxModule,
    DxTemplateModule
  ],
  providers:[
    Geolocation
  ],
  declarations: [ProgrammingDetailPage,StatesRequestProgrammingPipe,MapsUrlPipe]
})
export class ProgrammingDetailPageModule {}

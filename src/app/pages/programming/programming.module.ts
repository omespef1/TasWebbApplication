import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgrammingPage } from './programming.page';
import { ComponentsModule } from '../../components/components.module';
import { DxAccordionModule, DxCheckBoxModule, DxSliderModule, DxTagBoxModule, DxTemplateModule } from "devextreme-angular";

const routes: Routes = [
  {
    path: '',
    component: ProgrammingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DxAccordionModule,
    DxCheckBoxModule,
    DxSliderModule,
    DxTagBoxModule,
    DxTemplateModule
  ],
  declarations: [ProgrammingPage],
  exports:[ProgrammingPage,RouterModule]
})
export class ProgrammingPageModule {}

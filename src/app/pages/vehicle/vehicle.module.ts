import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VehiclePage } from './vehicle.page';
import { ComponentsModule } from '../../components/components.module';
import { ThirdPartiesPage } from '../third-parties/third-parties.page';
import { ThirdPartieValidationPage } from '../third-partie-validation/third-partie-validation.page';

const routes: Routes = [
  {
    path: '',
    component: VehiclePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehiclePage,ThirdPartiesPage,ThirdPartieValidationPage],
  entryComponents:[ThirdPartiesPage,ThirdPartieValidationPage]
})
export class VehiclePageModule {}

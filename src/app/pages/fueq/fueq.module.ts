import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FueqPage } from './fueq.page';
import { ComponentsModule } from '../../components/components.module';
import { OccasionalFuecPage } from '../occasional-fuec/occasional-fuec.page';

const routes: Routes = [
  {
    path: '',
    component: FueqPage
  },
  {
    path: 'occasional-fueq',
    component: OccasionalFuecPage
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
  declarations: [FueqPage,OccasionalFuecPage]
})
export class FueqPageModule {}

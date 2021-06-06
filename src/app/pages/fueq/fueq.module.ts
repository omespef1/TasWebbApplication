import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FueqPage } from './fueq.page';
import { ComponentsModule } from '../../components/components.module';
import { OccasionalFuecPage } from '../occasional-fuec/occasional-fuec.page';
import { TypeContractsComponent } from '../type-contracts/type-contracts/type-contracts.component';
import { PoliticalDivisionComponent } from '../political-division/political-division.component';
import { OcassionalRutesComponent } from '../occasional-rutes/ocassional-rutes/ocassional-rutes.component';

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
  declarations: [FueqPage,OccasionalFuecPage,TypeContractsComponent,PoliticalDivisionComponent,OcassionalRutesComponent],
  entryComponents:[TypeContractsComponent]
})
export class FueqPageModule {}

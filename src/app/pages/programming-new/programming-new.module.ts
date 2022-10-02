import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgrammingNewPage } from './programming-new.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const routes: Routes = [
  {
    path: '',
    component: ProgrammingNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProgrammingNewPage],
  providers: [ Geolocation ]
})
export class ProgrammingNewPageModule {}

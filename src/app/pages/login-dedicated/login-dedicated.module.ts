import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
// import { BusinessPage } from '../business/business.page';
import { LoginDedicatedPage } from './login-dedicated.page';

const routes: Routes = [
  {
    path: '',
    component: LoginDedicatedPage
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
  declarations: [LoginDedicatedPage],
  entryComponents:[ ]
})
export class LoginDedicatedPageModule {}

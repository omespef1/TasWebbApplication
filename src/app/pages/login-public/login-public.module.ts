import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPublicPage } from './login-public.page';
import { BussinesPublicPage } from '../bussines-public/bussines-public.page';
import { RoutesPublicPage } from '../routes-public/routes-public.page';
import { PointsPublicPage } from '../points-public/points-public.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPublicPage
  }
];

@NgModule({
  imports: [
        ComponentsModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPublicPage,BussinesPublicPage,RoutesPublicPage,PointsPublicPage],
 entryComponents:[ BussinesPublicPage,RoutesPublicPage,PointsPublicPage]
})
export class LoginPublicPageModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
 { path: '', loadChildren: './pages/login/login.module#LoginPageModule'},
 // { path: 'business', loadChildren: './pages/business/business.module#BusinessPageModule' },
  // { path: 'vehicle', loadChildren: './pages/vehicle/vehicle.module#VehiclePageModule' },
  // { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  //  { path: 'enlistment', loadChildren: './pages/enlistment/enlistment.module#EnlistmentPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AuthGuardService] },
  { path: 'programming-user-new', loadChildren: './pages/programming-user-new/programming-user-new.module#ProgrammingUserNewPageModule' },
  { path: 'login-public', loadChildren: './pages/login-public/login-public.module#LoginPublicPageModule' },
  { path: 'format-in-qr', loadChildren: './pages/format-in-qr/format-in-qr.module#FormatInQrPageModule' },
    { path: 'login-dedicated', loadChildren: './pages/login-dedicated/login-dedicated.module#LoginDedicatedPageModule' },






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

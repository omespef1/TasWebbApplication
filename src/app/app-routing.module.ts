import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'business', loadChildren: './pages/business/business.module#BusinessPageModule' },
  // { path: 'vehicle', loadChildren: './pages/vehicle/vehicle.module#VehiclePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
   { path: 'enlistment', loadChildren: './pages/enlistment/enlistment.module#EnlistmentPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  // { path: 'last-enlistments', loadChildren: './pages/last-enlistments/last-enlistments.module#LastEnlistmentsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

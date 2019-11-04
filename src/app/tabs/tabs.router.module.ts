import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'vehicle',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/vehicle/vehicle.module').then(m => m.VehiclePageModule)
          }
        ]
      },
      {
        path: 'last-enlistments',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/last-enlistments/last-enlistments.module').then(m => m.LastEnlistmentsPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/vehicle',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

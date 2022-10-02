import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../guards/auth-guard.service';
import { RolesGuard } from '../guards/roles.guard';

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
              import('../pages/vehicle/vehicle.module').then(m => m.VehiclePageModule),
          },
          {
            path: 'enlistemnt',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../pages/enlistment/enlistment.module').then(m => m.EnlistmentPageModule)
              }
            ]
          },
          {
            path: 'pendings',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../pages/pendings/pendings.module').then(m => m.PendingsPageModule)
              }
            ]
          },
        ],canActivate:[AuthGuardService]
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
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'forget-password',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
          }
        ]
      },
      {
        path: 'fueqs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/fueq/fueq.module').then(m => m.FueqPageModule)
          }
        ]
      },    
      {
        path: 'programming',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/programming/programming.module').then(m => m.ProgrammingPageModule)
          },
          {
            path: 'programming-detail',
            children:[
            {
              path:'',
              loadChildren: () =>
              import('../pages/programming-detail/programming-detail.module').then(m => m.ProgrammingDetailPageModule)
            }
            ]
           
          },
          {
            path: 'programming-new',
            children:[
            {
              path:'',
              loadChildren: () =>
              import('../pages/programming-new/programming-new.module').then(m => m.ProgrammingNewPageModule)
            }
            ]
           
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

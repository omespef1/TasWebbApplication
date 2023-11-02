import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { LogoComponentComponent } from '../components/logo-component/logo-component.component';


@NgModule({
  entryComponents: [
    LogoComponentComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage,LogoComponentComponent]
})
export class TabsPageModule {}

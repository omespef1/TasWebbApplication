import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ProgrammingPageModule } from '../pages/programming/programming.module';
import { ProgrammingNewPageModule } from '../pages/programming-new/programming-new.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ProgrammingPageModule,
    ProgrammingNewPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

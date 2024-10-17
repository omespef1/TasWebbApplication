import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponentComponent } from './logo-component/logo-component.component';





@NgModule({
  declarations: [
    HeaderComponent,LogoComponentComponent
  ],
  entryComponents:[LogoComponentComponent ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports:[
    HeaderComponent
  ]
})
export class ComponentsModule { }

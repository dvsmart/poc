import { NgModule } from '@angular/core';
import { CoreSharedModule } from '../../../../@core/core.module';
import { NavbarVerticalStyle1Module } from './vertical/style-1/style-1.module';
import { NavbarVerticalStyle2Module } from './vertical/style-2/style-2.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CoreSharedModule,
    NavbarVerticalStyle1Module,
    NavbarVerticalStyle2Module
  ],
  exports:[
    NavbarComponent
  ],
  declarations: [NavbarComponent]
})
export class NavbarModule { }

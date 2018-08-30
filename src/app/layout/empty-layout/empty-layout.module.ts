import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyLayoutComponent } from './empty-layout.component';
import { LoginModule } from '../../login/login.module';
import { CoreSharedModule } from '@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreSharedModule,
    LoginModule
  ],
  exports:[
    EmptyLayoutComponent
  ],
  declarations: [EmptyLayoutComponent]
})
export class EmptyLayoutModule { }

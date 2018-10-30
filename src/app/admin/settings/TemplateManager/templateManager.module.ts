import { NgModule } from '@angular/core';
import { CoreSharedModule } from '@core/core.module';
import { TemplateManagerRoutingModule } from './template-manager-routing.module';

@NgModule({
  imports: [
    CoreSharedModule,
    TemplateManagerRoutingModule
  ]
})
export class TemplateManagerModule { }

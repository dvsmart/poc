import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './template-list.component';
import { CustomMaterialModule } from '../../custom-material.module';
import { CoreSharedModule } from '@core/core.module';

const routes: Routes = [
  {
    path: '',
    component: TemplateListComponent,
  }
];

@NgModule({
  imports: [
      CoreSharedModule,
      CustomMaterialModule,
    RouterModule.forChild(routes),
  ],
  exports:[TemplateListComponent],
  declarations: [TemplateListComponent],
})
export class TemplateListModule { }

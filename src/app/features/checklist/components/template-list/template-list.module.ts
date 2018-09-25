import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './template-list.component';
import { CustomMaterialModule } from '../../custom-material.module';
import { CoreSharedModule } from '@core/core.module';
import { TemplateListService } from './templateList.service';

const routes: Routes = [
  {
    path: 'cat/:id',
    component: TemplateListComponent,
    resolve:{
      templates: TemplateListService
    }
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

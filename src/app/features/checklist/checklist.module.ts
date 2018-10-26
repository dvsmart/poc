import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/category-list/category-list.module#CategoryListModule',
  },
  {
    path: '',
    loadChildren:'./components/template-list/template-list.module#TemplateListModule',
  },
  {
    path: 'template/:id',
    loadChildren: './components/Template/template.module#TemplateModule'
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    CustomControlsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChecklistModule { }
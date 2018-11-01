import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'categories',
    loadChildren:'./components/manage-categories/category.module#CategoryModule'
  },
  {
    path:'templates',
    loadChildren:'./components/manage-templates/template.module#TemplatesModule'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateManagerRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:'./components/manage-categories/category.module#CategoryModule',
  },
  {
    path:'',
    loadChildren:'./components/manage-templates/template.module#TemplatesModule',
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateManagerRoutingModule { }

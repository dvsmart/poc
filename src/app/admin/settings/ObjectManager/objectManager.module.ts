import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesService } from './components/manage-categories/categories.service';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { SharedAdminModule } from 'app/admin/sharedAdmin.module';

const routes: Routes = [
  {
    path: '',
    component: ManageCategoriesComponent,
    resolve: {
      categories: CategoriesService
    }
  },
  {
    path: ':id',
    loadChildren:'./templateManager/templateManager.module#TemplateManagerModule'
  }
];


@NgModule({
  imports: [
    SharedAdminModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ManageCategoriesComponent]
})
export class ObjectManagerModule { }

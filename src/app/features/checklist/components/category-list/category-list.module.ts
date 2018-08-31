import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../../custom-material.module';
import { MatListModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { CategoryListService } from './category.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    resolve:{
      categories: CategoryListService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    CustomMaterialModule,
    RouterModule.forChild(routes),
  ],
  exports:[CategoryListComponent],
  declarations: [CategoryListComponent],
})
export class CategoryListModule { }

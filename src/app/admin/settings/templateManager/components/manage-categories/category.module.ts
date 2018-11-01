import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { CategoryListComponent } from "./category-list.component";
import { RouterModule, Routes } from "@angular/router";
import { CategoryService } from "./category.service";

const routes: Routes = [
    {
      path:'**',
      component:CategoryListComponent,
      resolve:{
        categories: CategoryService
      }
    }
  ];


@NgModule({
    imports: [
      CoreSharedModule,
      RouterModule.forChild(routes)
    ],
    declarations: [
        CategoryListComponent
    ],
  })
  export class CategoryModule { }
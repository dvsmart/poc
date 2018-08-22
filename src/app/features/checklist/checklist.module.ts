import { NgModule } from '@angular/core';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ListComponent } from './components/list/list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { CoreSharedModule } from '@core/core.module';
import { ChecklistService } from './services/checklist.service';
import { Routes, RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '@core/components/breadcrumb/breadcrumb.module';
import { ChecklistComponent } from './checklist.component';
import { MatListModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ChecklistComponent,
    children:[
      {
        path: 'cat/:id',
        component: CategoryListComponent,
      },
      {
        path: 'tem/:id',
        component: TemplateListComponent,
      },
      {
        path: 'list/:id',
        component: ListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    MatListModule,
    MatIconModule,
    BreadcrumbsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ChecklistService],
  declarations: [ChecklistComponent, TemplateListComponent, CategoryListComponent, ListComponent],
})
export class ChecklistModule { }
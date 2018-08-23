import { NgModule } from '@angular/core';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ListComponent } from './components/list/list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { ChecklistService } from './services/checklist.service';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistComponent } from './checklist.component';
import { MatListModule, MatIconModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { BreadcrumbsModule } from '@core/components/breadcrumb/breadcrumb.module';

const routes: Routes = [
  {
    path: '',
    component: ChecklistComponent,
  },
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
import { NgModule } from '@angular/core';
import { GenericList1Component } from './genericlist1.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { GenericList1Service } from './genericlist1.service';
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { GenericFilterComponent } from './task-filter/task-filter.component';
import { GenericDetailComponent } from './task-detail/task-detail.component';
import { GenericListGridComponent } from './task-list/task-list.component';
import { GenericListItemComponent } from './task-list/task-list-item/task-list-item.component';


const routes: Routes = [
  {
    path: 'all',
    component: GenericList1Component,
    resolve: {
      task: GenericList1Service
    }
  },
  {
    path: 'all/:taskId',
    component: GenericList1Component,
    resolve: {
      task: GenericList1Service
    }
  },
  {
    path: 'tag/:tagHandle',
    component: GenericList1Component,
    resolve: {
      task: GenericList1Service
    }
  },
  {
    path: 'tag/:tagHandle/:taskId',
    component: GenericList1Component,
    resolve: {
      task: GenericList1Service
    }
  },
  {
    path: 'filter/:filterHandle',
    component: GenericList1Component,
    resolve: {
      task: GenericList1Service
    }
  },
  {
    path: 'filter/:filterHandle/:taskId',
    component: GenericList1Component,
    resolve: {
      task: GenericList1Service
    }
  },
  {
    path: '**',
    redirectTo: 'all'
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    CoreSidebarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GenericList1Component, GenericFilterComponent, GenericDetailComponent, 
    GenericListGridComponent, GenericListItemComponent]
})
export class GenericList1Module { }

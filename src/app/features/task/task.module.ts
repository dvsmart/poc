import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { TaskService } from './task.service';
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { TaskListItemComponent } from './task-list/task-list-item/task-list-item.component';


const routes: Routes = [
  {
    path: 'all',
    component: TaskComponent,
    resolve: {
      task: TaskService
    }
  },
  {
    path: 'all/:taskId',
    component: TaskComponent,
    resolve: {
      task: TaskService
    }
  },
  {
    path: 'tag/:tagHandle',
    component: TaskComponent,
    resolve: {
      task: TaskService
    }
  },
  {
    path: 'tag/:tagHandle/:taskId',
    component: TaskComponent,
    resolve: {
      task: TaskService
    }
  },
  {
    path: 'filter/:filterHandle',
    component: TaskComponent,
    resolve: {
      task: TaskService
    }
  },
  {
    path: 'filter/:filterHandle/:taskId',
    component: TaskComponent,
    resolve: {
      task: TaskService
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
  declarations: [TaskComponent, TaskFilterComponent, TaskDetailComponent, TaskListComponent, TaskListItemComponent]
})
export class TaskModule { }

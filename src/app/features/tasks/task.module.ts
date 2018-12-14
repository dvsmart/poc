import { NgModule } from '@angular/core';
import { CoreSharedModule } from '@core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './task/task.service';
import { TasksService } from './tasks/tasks.service';
import { MAT_DATE_LOCALE } from '@angular/material';

const riskRoutes: Routes = [
  {
    path: '',
    component: TasksComponent,
    resolve:{
      tasks: TasksService
    }
  },
  {
    path: ':id',
    component: TaskComponent,
    resolve: {
      risk: TaskService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    
    RouterModule.forChild(riskRoutes)
  ],
  declarations: [TasksComponent, TaskComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class TaskModule { }

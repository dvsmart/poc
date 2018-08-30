import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../@core/core.module';
import { AuthGuard } from '../login/auth.guard';
import { BreadcrumbsModule } from '@core/components/breadcrumb/breadcrumb.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'asset/properties',
        loadChildren: './asset/asset.module#AssetModule'
      },
      {
        path: 'assessment',
        loadChildren: './assessment/assessment.module#AssessmentModule'
      },
      {
        path: 'calender',
        loadChildren: './calendar/calendar.module#CalendarModule'
      },
      {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#TaskModule'
      },
      {
        path: 'checklist',
        loadChildren: './checklist/checklist.module#ChecklistModule',
      }
    ]
  },
  {
    path: 'forgot-password',
    loadChildren: './authentication/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: 'lock',
    loadChildren: './authentication/lock-screen/lock-screen.module#LockModule',
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    BreadcrumbsModule,
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class FeaturesModule { }

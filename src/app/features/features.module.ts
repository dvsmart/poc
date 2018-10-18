import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../@core/core.module';
import { AuthGuard } from '../_guards/auth.guard';

import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { Error404Component } from '../pages/errors/error404/error404.component';
import { MatIconModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
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
        path: 'asset',
        loadChildren: './asset/asset.module#AssetModule',
        data: { preload: true, delay: true }
      },
      {
        path: 'assessment',
        loadChildren: './assessment/assessment.module#AssessmentModule',
        data: { preload: true, delay: true }
      },
      {
        path: 'calender',
        loadChildren: './calendar/calendar.module#CalendarModule',
        data: { preload: false, delay: true }
      },
      {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule',
        data: { preload: true, delay: false }
      },
      {
        path: 'task',
        loadChildren: './task/task.module#TaskModule',
        data: { preload: true, delay: true }
      },
      {
        path: 'checklist',
        loadChildren: './checklist/checklist.module#ChecklistModule',
        data: { preload: true, delay: false }
      },
      {
        path: '',
        loadChildren: './users/users.module#UsersModule',
        data: { preload: false, delay: true }
      },
      {
        path: 'admin',
        loadChildren: '../admin/admin.module#AdminModule',
        data: { preload: false, delay: true },
      }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: 'account/login',
        loadChildren: '../login/login.module#LoginModule',
      },
      {
        path: 'account/forgot-password',
        loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordModule',
      },
      {
        path: 'account/lock',
        loadChildren: '../pages/lock-screen/lock-screen.module#LockModule',
      },

    ]
  },
  {
    path:'**',component:Error404Component
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Error404Component],
  entryComponents:[Error404Component]
})
export class FeaturesModule { }

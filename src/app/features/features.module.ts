import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../@core/core.module';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
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
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarModule'
  },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoModule'
  },
  {
    path: 'task',
    loadChildren: './task/task.module#TaskModule'
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class FeaturesModule { }

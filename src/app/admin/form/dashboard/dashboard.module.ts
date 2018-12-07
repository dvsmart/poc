import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { DashboardService } from './dashboard.service';
import { FormsComponent } from './forms/forms.component';
import { FormsService } from './forms/forms.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'folder/:id',
        component: FormsComponent,
        resolve: {
          forms: FormsService
        }
      },
      {
        path:'**',
        redirectTo:'folder/uncategorised'
      }
    ],
    resolve: {
      cats: DashboardService
    }
  },
  {
    path: 'builder',
    loadChildren: '../builder/builder.module#BuilderModule'
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, FormsComponent]
})
export class DashboardModule { }

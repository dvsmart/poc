import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { DashboardService } from './dashboard.service';
import { FormsComponent } from './forms/forms.component';
import { FormsService } from './forms/forms.service';
import { CategoryComponent } from './category/category.component';
import { FormComponent } from './form/form.component';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: ':id/:slug',
        component: FormsComponent,
        resolve: {
          forms: FormsService
        }
      },
      {
        path: '**',
        redirectTo: 'forms/uncategorised'
      }
    ],
    resolve: {
      categories: DashboardService
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
    FuseConfirmDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, FormsComponent, CategoryComponent, FormComponent],
  entryComponents: [CategoryComponent, FormComponent, FuseConfirmDialogComponent]
})
export class DashboardModule { }

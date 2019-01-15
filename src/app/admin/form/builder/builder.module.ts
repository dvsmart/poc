import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { BuilderComponent } from './builder.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldsService } from './fields/fields.service';
import { FieldComponent } from './fields/field/field.component';
import { FieldService } from './fields/field/field.service';
import { TabsService } from './tabs/tabs.service';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { TabService } from './tabs/tab/tab.service';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { FieldDetailComponent } from './fields/field-detail/field-detail.component';

const routes: Routes = [
  {
    path: ':id/:slug',
    component: BuilderComponent,
    children: [
      {
        path: 'fields',
        component: FieldsComponent,
        resolve: {
          fields: FieldsService
        }
      },
      {
        path: 'fields/:id',
        component: FieldComponent,
        resolve: {
          field: FieldService
        }
      },
      {
        path: 'fields/:id/detail',
        component: FieldDetailComponent
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsModule'
      },
      {
        path: 'tabs',
        component: TabsComponent,
        resolve: {
          tabs: TabsService
        }
      },
      {
        path: 'tabs/:id',
        component: TabComponent,
        resolve: {
          tab: TabService
        }
      },
      {
        path: '**',
        redirectTo: 'fields'
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    FuseConfirmDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuilderComponent, FieldsComponent, FieldComponent, TabsComponent, TabComponent, FieldDetailComponent],
  entryComponents: [FuseConfirmDialogComponent]
})
export class BuilderModule { }

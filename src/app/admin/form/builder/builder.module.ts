import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { BuilderComponent } from './builder.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldsService } from './fields/fields.service';
import { FieldComponent } from './field/field.component';
import { FieldService } from './field/field.service';
import { TabsService } from '../tabs/tabs.service';

const routes: Routes = [
  {
    path: ':id',
    component: BuilderComponent,
    children: [
      {
        path: 'build',
        component: FieldsComponent,
        resolve: {
          fields: FieldsService
        }
      },
      {
        path: 'build/field',
        component: FieldComponent,
        resolve: {
          field: FieldService
        }
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsModule'
      },
      {
        path: 'tabs',
        loadChildren: '../tabs/tabs.module#TabsModule',
        resolve:{
          tabs: TabsService
        }
      },
      {
        path: '**',
        redirectTo: 'build'
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuilderComponent, FieldsComponent, FieldComponent]
})
export class BuilderModule { }

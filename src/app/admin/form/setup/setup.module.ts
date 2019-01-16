import { NgModule } from '@angular/core';
import { SetupComponent } from './setup.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';

const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
    children: [
      {
        path: 'build',
        loadChildren: '../build/build.module#BuildModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsModule'
      },
      {
        path: 'tabs',
        loadChildren: '../tabs/tabs.module#TabsModule'
      },
    ]
  }
]


@NgModule({
  declarations: [SetupComponent],
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SetupModule { }

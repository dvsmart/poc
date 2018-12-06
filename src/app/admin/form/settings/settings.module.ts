import { NgModule } from '@angular/core';
import { GeneralComponent } from './general/general.component';
import { CoreSharedModule } from '@core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UserAccessComponent } from './user-access/user-access.component';

const routes: Routes = [
  {
    path: '',
    component:SettingsComponent,
    children:[
      {
        path:'general',
        component:GeneralComponent
      },
      {
        path:'useraccess',
        component:UserAccessComponent
      },
      {
        path:'',
        redirectTo:'general'
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneralComponent, SettingsComponent, UserAccessComponent]
})
export class SettingsModule { }

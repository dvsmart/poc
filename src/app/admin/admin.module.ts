import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { SharedAdminModule } from './sharedAdmin.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setup/customObject',
        loadChildren: './settings/templateManager/templateManager.module#TemplateManagerModule',
      },
      {
        path: 'setup/menuManagement',
        loadChildren: './settings/menu/menu.module#MenuManagementModule',
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedAdminModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
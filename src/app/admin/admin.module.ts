import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { AdminGuard } from '../_guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'customObject',
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
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../@core/core.module';
import { AdminGuard } from '../_guards/admin.guard';
import { MatIconModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setup/customObject',
        loadChildren: './settings/ObjectManager/objectManager.module#ObjectManagerModule',
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
    CoreSharedModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }

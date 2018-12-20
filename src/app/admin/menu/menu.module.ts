import { NgModule } from '@angular/core';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListService } from './components/menu-list/menu-list.service';
import { MenuService } from './components/menu/menu.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';

const menuRoutes: Routes = [
  {
    path: 'setup',
    component: MenuListComponent,
    resolve: {
      properties: MenuListService
    }
  },
  {
    path: 'setup/:id',
    component: MenuComponent,
    resolve: {
      property: MenuService
    }
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    FuseConfirmDialogModule,
    RouterModule.forChild(menuRoutes)
  ],
  declarations: [MenuListComponent, MenuComponent],
  entryComponents: [FuseConfirmDialogComponent]
})
export class MenuModule { }

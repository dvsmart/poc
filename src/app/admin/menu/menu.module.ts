import { NgModule } from '@angular/core';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListService } from './components/menu-list/menu-list.service';
import { MenuService } from './components/menu/menu.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';

const menuRoutes: Routes = [
  {
    path: '',
    component: MenuListComponent,
    resolve: {
      properties: MenuListService
    }
  },
  {
    path: 'menu/:id',
    component: MenuComponent,
    resolve: {
      property: MenuService
    }
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(menuRoutes)
  ],
  declarations: [MenuListComponent, MenuComponent]
})
export class MenuModule { }

import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatSelectModule, MatNativeDateModule, MatTabsModule, MatSortModule, MatChipsModule, MatSnackBarModule } from '@angular/material';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListService } from './components/menu-list/menu-list.service';
import { MenuService } from './components/menu/menu.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
export class MenuManagementModule { }

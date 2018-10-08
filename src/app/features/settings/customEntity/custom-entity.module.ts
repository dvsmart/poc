import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { MatTreeModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { CustomentityService } from './service/customentity.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCustomDialog } from './components/categories/add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageFieldsComponent } from './components/manage-fields/manage-fields.component';
import { FieldTypesComponent } from './components/field-types/field-types.component';
import { ManageTabsComponent } from './components/manage-tabs/manage-tabs.component';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { CustomTabService } from './service/custom-tab.service';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CustomentityService
    }
  },
  {
    path: 'tab/:id',
    component: ManageFieldsComponent,
    resolve: {
      tabs: CustomTabService
    }
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    CoreSidebarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CategoriesComponent, AddCustomDialog, ManageFieldsComponent, FieldTypesComponent,ManageTabsComponent],
  entryComponents: [AddCustomDialog, FieldTypesComponent]
})
export class CustomEntityModule { }

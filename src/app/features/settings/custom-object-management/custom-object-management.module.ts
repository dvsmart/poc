import { NgModule } from '@angular/core';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesService } from './components/manage-categories/categories.service';
import { CdkTableModule } from '@angular/cdk/table';
import { TemplateService } from './managecustomobject/components/manage-custom-templates/template.service';
import { CustomobjectcontentComponent } from './managecustomobject/components/customobjectcontent/customobjectcontent.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCategoriesComponent,
    resolve: {
      categories: CategoriesService
    }
  },
  {
    path: 'templatesetup/:id',
    loadChildren: './managecustomobject/managecustomobject.module#ManagecustomobjectModule',
    resolve: {
      categories: TemplateService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    CoreSidebarModule,
    CdkTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
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
    RouterModule.forChild(routes),
  ],
  declarations: [ManageCategoriesComponent]
})
export class CustomObjectManagementModule { }

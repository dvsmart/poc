import { NgModule } from '@angular/core';
import { ManageTemplatesComponent } from './components/manage-templates/manage-templates.component';
import { TemplateSidebarComponent } from './components/template-sidebar/template-sidebar.component';
import { ManageTabsComponent } from './components/manage-tabs/manage-tabs.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule, MatStepperModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { TemplatesService } from './components/manage-templates/templates.service';
import { TemplateSetupComponent } from './components/template-setup/template-setup.component';
import { EditTemplateComponent } from './components/edit-template/edit-template.component';
import { EditTabComponent } from './components/edit-tab/edit-tab.component';
import { ManageFieldsComponent } from './components/manage-fields/manage-fields.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { TemplateSetupService } from './components/template-setup/templatesetup.service';


const routes: Routes = [
  {
    path: '',
    component: ManageTemplatesComponent,
    resolve: {
      categories: TemplatesService
    }
  },
  {
    path: 'manage/:id',
    component: TemplateSetupComponent,
    children: [
      {
        path: 'details',
        component: EditTemplateComponent
      },
      {
        path: 'tabs',
        component: ManageTabsComponent,
        children: [{
          path: ':id',
          component: EditTabComponent
        }]
      },
      {
        path: 'fields',
        component: ManageFieldsComponent,
        children: [{
          path: ':id',
          component: EditFieldComponent
        }]
      }
    ],
    resolve:{
      tabs: TemplateSetupService
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
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forChild(routes),

  ],
  declarations: [ManageTemplatesComponent, TemplateSidebarComponent, ManageTabsComponent, TemplateSetupComponent, EditTemplateComponent, EditTabComponent, ManageFieldsComponent, EditFieldComponent]
})
export class TemplateManagerModule { }

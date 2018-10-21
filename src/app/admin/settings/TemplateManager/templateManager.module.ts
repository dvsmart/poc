import { NgModule } from '@angular/core';
import { ManageTemplatesComponent } from './components/manage-templates/manage-templates.component';
import { TemplateSidebarComponent } from './components/template-sidebar/template-sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesService } from './components/manage-templates/templates.service';
import { TemplateSetupComponent } from './components/template-setup/template-setup.component';
import { EditTemplateComponent } from './components/edit-template/edit-template.component';
import { ManageFieldsComponent } from './components/manage-fields/manage-fields.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { TemplateSetupService } from './components/template-setup/templatesetup.service';
import { TabListComponent } from './components/manage-tabs/tab-list.component';
import { ManageTabsComponent } from './components/manage-tabs/tab.component';
import { SharedAdminModule } from 'app/admin/sharedAdmin.module';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { CategoriesService } from './components/manage-categories/categories.service';
import { FieldDetailComponent } from './components/field-detail/field-detail.component';
import { TabListItemComponent } from './components/manage-tabs/tab-list-item/tab-list-item.component';
import { TabDetailComponent } from './components/manage-tabs/tab-detail/tab-detail.component';


const routes: Routes = [
  {
    path: 'categories',
    component: ManageCategoriesComponent,
    resolve: {
      categories: CategoriesService
    }
  },
  {
    path: 'templates',
    component: ManageTemplatesComponent,
    resolve: {
      templates: TemplatesService
    }
  },
  {
    path: 'templates/:id',
    component: TemplateSetupComponent,
    children: [
      {
        path: '',
        component: EditTemplateComponent
      },
      {
        path: 'tabs',
        component: ManageTabsComponent,
        children: [{
          path: ':id',
          component: TabDetailComponent
        }]
      },
      {
        path: 'fields',
        component: ManageFieldsComponent,
        children: [{
          path: ':id',
          component: FieldDetailComponent
        }]
      }
    ],
    resolve: {
      tabs: TemplateSetupService
    }
  }
];

@NgModule({
  imports: [
    SharedAdminModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    ManageCategoriesComponent,
    ManageTemplatesComponent,
    TemplateSidebarComponent,
    ManageTabsComponent,
    TabListComponent,
    TabListItemComponent,
    TemplateSetupComponent,
    EditTemplateComponent,
    TabDetailComponent,
    ManageFieldsComponent,
    EditFieldComponent,
    FieldDetailComponent
  ],
})
export class TemplateManagerModule { }

import { NgModule } from '@angular/core';
import { ManageTemplatesComponent } from './components/manage-templates/manage-templates.component';
import { TemplateSidebarComponent } from './components/template-sidebar/template-sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesService } from './components/manage-templates/templates.service';
import { TemplateSetupComponent } from './components/template-setup/template-setup.component';
import { ManageFieldsComponent } from './components/manage-fields/manage-fields.component';
import { TemplateSetupService } from './components/template-setup/templatesetup.service';
import { TabListComponent } from './components/manage-tabs/tab-list/tab-list.component';
import { ManageTabsComponent } from './components/manage-tabs/tab.component';
import { SharedAdminModule } from 'app/admin/sharedAdmin.module';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { CategoriesService } from './components/manage-categories/categories.service';
import { TabDetailComponent } from './components/manage-tabs/tab-detail/tab-detail.component';
import { TemplateDetailComponent } from './components/manage-templates/template-detail/template-detail.component';
import { FieldDetailComponent } from './components/manage-fields/field-detail/field-detail.component';
import { TabListItemComponent } from './components/manage-tabs/tab-list/tab-list-item/tab-list-item.component';


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
        path: 'details',
        component: TemplateDetailComponent
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
      },
      {
        path: '**',
        redirectTo: 'details'
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
    TemplateDetailComponent,
    TabDetailComponent,
    ManageFieldsComponent,
    FieldDetailComponent,
    FieldDetailComponent
  ],
})
export class TemplateManagerModule { }

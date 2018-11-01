import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { TemplateDetailComponent } from "./template-detail/template-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { ManageTemplatesComponent } from "./template-list/template-list.component";
import { SetupComponent } from "./setup/setup.component";
import { SetupService } from "./setup.service";
import { TemplatesService } from "./template-list/templateList.service";
import { TabComponent } from "../manage-tabs/tab.component";
import { TabListItemComponent } from "../manage-tabs/tab-list/tab-list-item/tab-list-item.component";
import { TabListComponent } from "../manage-tabs/tab-list/tab-list.component";
import { TabDetailComponent } from "../manage-tabs/tab-detail/tab-detail.component";
import { FieldListComponent } from "../manage-fields/field-list.component";
import { FieldDetailComponent } from "../manage-fields/field-detail/field-detail.component";
import { FieldService } from "../manage-fields/field-detail/field.service";
import { TabsComponent } from "../manage-tabs/tabs/tabs.component";
import { TabService } from "../manage-tabs/tab-detail/tab.service";
import { SetupSidebarComponent } from "./setup/setup-sidebar/setup-sidebar.component";

const routes: Routes = [
  {
    path: '',
    component: ManageTemplatesComponent,
    resolve: {
      categories: TemplatesService
    },
  },
  {
    path: ':id',
    component: SetupComponent,
    children: [
      {
        path: 'details',
        component: TemplateDetailComponent,
      },
      {
        path: 'tabs/:id',
        component: TabComponent,
        children: [
          {
            path: 'details',
            component: TabDetailComponent,
          },
          {
            path: 'fields',
            component: FieldListComponent,
            children: [
              {
                path: ':id',
                component: FieldDetailComponent
              }
            ]
          },
          {
            path:'**',
            redirectTo:'details'
          }
        ],
        resolve: {
          tab: TabService
        }
      },
      {
        path: '**',
        redirectTo: 'details'
      }
    ],
    resolve: {
      setup: SetupService,
    }
  },

];


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ManageTemplatesComponent,
    TemplateDetailComponent,
    SetupComponent,
    SetupSidebarComponent,
    TabListComponent,
    TabListItemComponent,
    TabComponent,
    TabsComponent,
    TabDetailComponent,
    FieldListComponent,
    FieldDetailComponent
  ],
})
export class TemplatesModule { }
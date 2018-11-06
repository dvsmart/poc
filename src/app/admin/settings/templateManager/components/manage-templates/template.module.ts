import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { TemplateDetailComponent } from "./template-detail/template-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { ManageTemplatesComponent } from "./template-list/template-list.component";
import { SetupComponent } from "./setup/setup.component";
import { SetupService } from "./setup.service";
import { TemplatesService } from "./template-list/templateList.service";
import { TabDetailComponent } from "../manage-tabs/tab-detail/tab-detail.component";
import { FieldListComponent } from "../manage-fields/field-list.component";
import { FieldDetailComponent } from "../manage-fields/field-detail/field-detail.component";
import { TabsComponent } from "../manage-tabs/tabs/tabs.component";
import { TabService } from "../manage-tabs/tab-detail/tab.service";
import { SetupSidebarComponent } from "./setup/setup-sidebar/setup-sidebar.component";
import { FieldService } from "../manage-fields/field-detail/field.service";
import { TabsService } from "../manage-tabs/tabs/tabs.service";

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
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: TemplateDetailComponent },
      {
        path: 'tabs',
        component: TabsComponent,
        resolve: {
          tabs: TabsService
        }
      },
      {
        path: 'tabs/:id',
        component: TabDetailComponent,
        resolve: {
          tab: TabService
        }
      }
    ],
    resolve: {
      setup: SetupService,
    }
  }
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
    TabsComponent,
    TabDetailComponent,
    FieldListComponent,
    FieldDetailComponent
  ],
})
export class TemplatesModule { }
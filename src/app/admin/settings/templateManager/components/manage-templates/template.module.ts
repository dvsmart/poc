import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { TemplateDetailComponent } from "./template-detail/template-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { ManageTemplatesComponent } from "./template-list/template-list.component";
import { SetupComponent } from "./setup/setup.component";
import { SetupService } from "./setup/setup.service";
import { SetupSidebarComponent } from "./setup/setup-sidebar/setup-sidebar.component";
import { TemplatesService } from "./template-list/templateList.service";
import { TemplateDetailService } from "./template-detail/templateDetail.service";


const routes: Routes = [
  {
    path: 'templateManagement',
    component: ManageTemplatesComponent,
    resolve: {
      categories: TemplatesService
    },
  },
  {
    path: 'templateManagement/:id',
    component: SetupComponent,
    resolve: {
      setup: SetupService,
    },
    children: [
      {
        path: 'details',
        component: TemplateDetailComponent
      },
      {
        path: '**',
        redirectTo: 'details'
      }
    ]
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
    SetupSidebarComponent
  ],
})
export class TemplatesModule { }
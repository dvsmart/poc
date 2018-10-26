import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { TemplateDetailComponent } from "./template-detail/template-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { TemplatesService } from "./templates.service";
import { ManageTemplatesComponent } from "./template-list.component";
import { SetupComponent } from "../setup/setup.component";
import { SetupService } from "../setup/setup.service";
import { SetupSidebarComponent } from "../setup/setup-sidebar/setup-sidebar.component";

const routes: Routes = [
  {
    path: 'templateManagement',
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
        path: '**',
        redirectTo: 'details'
      }
    ],
    resolve: {
      setup: SetupService
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
    SetupSidebarComponent
  ],
})
export class TemplatesModule { }
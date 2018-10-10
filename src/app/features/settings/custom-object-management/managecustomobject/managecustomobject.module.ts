import { NgModule } from '@angular/core';
import { CustomobjectsidebarComponent } from './components/customobjectsidebar/customobjectsidebar.component';
import { CustomobjectcontentComponent } from './components/customobjectcontent/customobjectcontent.component';
import { ManageCustomTabsComponent } from './components/manage-custom-tabs/manage-custom-tabs.component';
import { ManageCustomTemplatesComponent } from './components/manage-custom-templates/manage-custom-templates.component';
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import { TemplateService } from './components/manage-custom-templates/template.service';
import { TabService } from './components/manage-custom-tabs/tab.service';

const routes: Routes = [
  {
    path: '',
    component: ManageCustomTemplatesComponent,
    resolve: {
      categories: TemplateService
    }
  },
  {
    path: 'tab/:id',
    component: ManageCustomTabsComponent,
    resolve: {
      categories: TabService
    }
  },
  {
    path: 'manageTab',
    component: CustomobjectcontentComponent
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
  declarations: [CustomobjectsidebarComponent, CustomobjectcontentComponent, ManageCustomTabsComponent, ManageCustomTemplatesComponent]
})
export class ManagecustomobjectModule { }

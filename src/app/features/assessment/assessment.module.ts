import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentFilterComponent } from './assessment-filter/assessment-filter.component';
import { AssessmentService } from './assessment.service';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatMenuModule, MatInputModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatToolbarModule, MatSelectModule, MatTabsModule, MatNativeDateModule } from '../../../../node_modules/@angular/material';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { FuseSidebarModule } from '@core/components/sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    resolve: {
      properties: AssessmentService
    },
    children:[
      {
        path: 'detail/:id',
        component: AssessmentFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTabsModule,
    RouterModule.forChild(routes),
  ],
  providers: [AssessmentService],
  declarations: [AssessmentComponent, AssessmentListComponent, AssessmentFormComponent, AssessmentFilterComponent],
})
export class AssessmentModule { }

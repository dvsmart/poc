import { NgModule } from '@angular/core';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatMenuModule, MatInputModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatToolbarModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatSortModule, MatChipsModule, MatSnackBarModule } from '../../../../node_modules/@angular/material';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { FuseSidebarModule } from '@core/components/sidebar/sidebar.module';
import { AssessmentsService } from './assessment-list/assessments.service';
import { AssessmentService } from './assessment-form/assessment.service';

const assessmentRoutes: Routes = [
  {
    path: 'assessment',
    component: AssessmentListComponent,
    resolve: {
      assessments: AssessmentsService
    }
  },
  {
    path: 'assessment/:id',
    component: AssessmentFormComponent,
    resolve: {
      assessment: AssessmentService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,

    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatMenuModule,
    RouterModule.forChild(assessmentRoutes),
  ],
  providers: [AssessmentService, AssessmentsService],
  declarations: [AssessmentListComponent, AssessmentFormComponent],
})
export class AssessmentModule { }

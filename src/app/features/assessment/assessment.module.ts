import { NgModule } from '@angular/core';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatMenuModule, MatInputModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatToolbarModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatSortModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule } from '../../../../node_modules/@angular/material';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { AssessmentsService } from './assessment-list/assessments.service';
import { AssessmentService } from './assessment-form/assessment.service';

const assessmentRoutes: Routes = [
  {
    path: '',
    component: AssessmentListComponent,
    resolve: {
      assessments: AssessmentsService
    }
  },
  {
    path: ':id',
    component: AssessmentFormComponent,
    resolve: {
      assessment: AssessmentService
    }
  }
];

@NgModule({
  imports: [
    FuseConfirmDialogModule,
    CoreSidebarModule,
    CoreSharedModule,
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
    MatProgressSpinnerModule,
    RouterModule.forChild(assessmentRoutes),
  ],
  declarations: [AssessmentListComponent, AssessmentFormComponent],
})
export class AssessmentModule { }

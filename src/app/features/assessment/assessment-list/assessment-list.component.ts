import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '../../../../../node_modules/@angular/material';
import { Subject, Observable } from '../../../../../node_modules/rxjs';
import { AssessmentService } from '../assessment.service';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';
import { DataSource } from '../../../../../node_modules/@angular/cdk/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AssessmentListComponent implements OnInit {
  resultsLength: number;
  properties: any;
  pageSize = 10;
  dataSource: AssessmentDataSource | null;
  displayedColumns = ['checkbox', 'dataId', 'title', 'reference', 'assessmentType', 'assessmentScope', 'buttons'];
  selectedAssessments: any[];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;
  currentPage: number;

  constructor(
    private _assessmentservice: AssessmentService,
    public _matDialog: MatDialog,
    private router: Router
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.dataSource = new AssessmentDataSource(this._assessmentservice);
    this._assessmentservice.onAssessmentsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(result => {
        this.properties = result;
        this.resultsLength = result;
        this.checkboxes = {};
        result.map(property => {
          this.checkboxes[property.id] = false;
        });
      });

    this._assessmentservice.onSelectedAssessmentsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedProperties => {
        for (const id in this.checkboxes) {
          if (!this.checkboxes.hasOwnProperty(id)) {
            continue;
          }

          this.checkboxes[id] = selectedProperties.includes(id);
        }
        this.selectedAssessments = selectedProperties;
      });

    this._assessmentservice.onFilterChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._assessmentservice.deselectAssessments();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  editAssessment(assessmentId): void {
    this.router.navigate(['assessment/detail/' + assessmentId]);
  }

  deleteAssessment(assessmentId): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._assessmentservice.deleteAssessments(assessmentId);
      }
      this.confirmDialogRef = null;
    });

  }

  onSelectedChange(assessmentId): void {
    this._assessmentservice.toggleSelectedAssessment(assessmentId);
  }

  getPageSize(): Observable<number> {
    return this._assessmentservice.dataLength;
  }

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this._assessmentservice.getAssessments(this.currentPage, this.pageSize);
  }
}

export class AssessmentDataSource extends DataSource<any>
{
  constructor(private _assessmentservice: AssessmentService) { super(); }
  connect(): Observable<any[]> {
    return this._assessmentservice.onAssessmentsChanged;
  }
  disconnect(): void {
  }
}

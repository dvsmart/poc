import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog } from '../../../../../node_modules/@angular/material';
import { Subject, Observable } from '../../../../../node_modules/rxjs';
import { AssessmentService } from '../assessment.service';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { FormGroup } from '../../../../../node_modules/@angular/forms';
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
  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;
  resultsLength: number;
  properties: any;
  pageSize = 10;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'dataId', 'title','reference', 'assessmentType', 'assessmentScope', 'buttons'];
  selectedContacts: any[];
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

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this._assessmentservice);



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
        this.selectedContacts = selectedProperties;
      });

    this._assessmentservice.onFilterChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._assessmentservice.deselectAssessments();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Edit contact
   *
   * @param contact
   */
  editContact(assessment): void {
    debugger;
    this.router.navigate(['assessment/detail/'+ assessment.id]);
    // this.dialogRef = this._matDialog.open(AssessmentFormComponent, {
    //   panelClass: 'contact-form-dialog',
    //   data: {
    //     contact: contact,
    //     action: 'edit'
    //   }
    // });

    // this.dialogRef.afterClosed()
    //   .subscribe(response => {
    //     if (!response) {
    //       return;
    //     }
    //     const actionType: string = response[0];
    //     const formData: FormGroup = response[1];
    //     switch (actionType) {
    //       /**
    //        * Save
    //        */
    //       case 'save':

    //         this._assessmentservice.updateContact(formData.getRawValue());

    //         break;
    //       /**
    //        * Delete
    //        */
    //       case 'delete':

    //         this.deleteAssessment(contact);

    //         break;
    //     }
    //   });
  }

  /**
   * Delete Contact
   */
  deleteAssessment(assessment): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._assessmentservice.deleteAssessments(assessment);
      }
      this.confirmDialogRef = null;
    });

  }

  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void {
    this._assessmentservice.toggleSelectedContact(contactId);
  }

  getPageSize(): Observable<number>{
    return this._assessmentservice.dataLength;
  }

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this._assessmentservice.getAssessments(this.currentPage,this.pageSize);
  }

}

export class FilesDataSource extends DataSource<any>
{

  constructor(
    private _assessmentservice: AssessmentService
  ) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._assessmentservice.onAssessmentsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}

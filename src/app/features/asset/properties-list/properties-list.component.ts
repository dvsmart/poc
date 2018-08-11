import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PropertiesService } from '../properties.service';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { PropertiesFormComponent } from '../properties-form/properties-form.component';
import { fuseAnimations } from '@core/animations';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PropertiesListComponent implements OnInit {
  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;
  resultsLength: number;
  properties: any;
  pageSize = 10;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'propertyReference','addressLine1', 'addressLine2', 'postCode', 'city', 'portfolioName', 'buttons'];
  selectedContacts: any[];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;
  currentPage: number;

  /**
   * Constructor
   *
   * @param {ContactsService} _contactsService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private _propertyservice: PropertiesService,
    public _matDialog: MatDialog
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
    this.dataSource = new FilesDataSource(this._propertyservice);



    this._propertyservice.onPropertiesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(result => {
        this.properties = result;
        this.resultsLength = result;
        this.checkboxes = {};
        result.map(property => {
          this.checkboxes[property.id] = false;
        });
      });

    this._propertyservice.onSelectedPropertiesChanged
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

    this._propertyservice.onFilterChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._propertyservice.deselectProperties();
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
  editContact(contact): void {
    this.dialogRef = this._matDialog.open(PropertiesFormComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        contact: contact,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Save
           */
          case 'save':

            this._propertyservice.updateContact(formData.getRawValue());

            break;
          /**
           * Delete
           */
          case 'delete':

            this.deleteContact(contact);

            break;
        }
      });
  }

  /**
   * Delete Contact
   */
  deleteContact(contact): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._propertyservice.deleteProperties(contact);
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
    this._propertyservice.toggleSelectedContact(contactId);
  }

  getPageSize(): Observable<number>{
    return this._propertyservice.dataLength;
  }

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this._propertyservice.getProperties(this.currentPage,this.pageSize);
  }

}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {ContactsService} _contactsService
   */
  constructor(
    private _propertiesservice: PropertiesService
  ) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._propertiesservice.onPropertiesChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}
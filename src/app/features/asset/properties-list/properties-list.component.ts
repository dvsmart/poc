import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PropertiesService } from '../properties.service';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

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
  pageSize: number;
  total: number;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'propertyReference', 'addressLine1', 'addressLine2', 'postCode', 'city', 'portfolioName', 'buttons'];
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

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  editProperty(propertyId): void {
    this.router.navigate(['asset/properties/edit/', propertyId]);
  }

  deleteProperty(id): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._propertyservice.deleteProperties(id);
      }
      this.confirmDialogRef = null;
    });

  }

  onSelectedChange(propertyId): void {
    this._propertyservice.toggleSelectedProperty(propertyId);
  }

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this._propertyservice.getProperties(this.currentPage, this.pageSize);
  }
}

export class FilesDataSource extends DataSource<any>
{
  constructor(private _propertiesservice: PropertiesService) {
    super();
  }
  connect(): Observable<any[]> {
    return this._propertiesservice.onPropertiesChanged;
  }
  disconnect(): void {
  }
}
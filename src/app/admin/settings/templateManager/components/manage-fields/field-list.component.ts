import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { FieldService } from './field.service';
import { FieldResponse } from './field.model';
import { FuseUtils } from '@core/utils';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss'],
  animations: fuseAnimations
})
export class FieldListComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  field: FieldResponse;

  dataSource: FilesDataSource | null;
  displayedColumns: string[] = ['fieldCaption', 'isRequired', 'addedBy', 'addedOn', 'actions'];

  templateId: number;
  isEdit: boolean = false;
  isDetail: boolean = false;
  fields: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fieldservice: FieldService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.templateservice.onSelectedTemplateChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(([response, formType]) => {
    //     this.templateId = response.id;
    //     this.fieldservice.getFieldTypes();
    //   });
    // this.fieldservice.onNewFieldAdded
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(([tabId, templateId]) => {
    //     if (tabId == undefined) {
    //       this.isEdit = false;
    //     }
    //   })

    this.dataSource = new FilesDataSource(this.paginator, this.sort);
  }

  editField(field) {
    this.isEdit = true;
    this.field = field;
    this.isDetail = true;
  }

  addField() {
    this.isEdit = true;
    this.fieldservice.onNewFieldAdded.next(['', this.templateId]);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  constructor(
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    //this.filteredData = this.service.fields;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      //this._matPaginator.page,
      // this._filterChange,
      // this._matSort.sortChange
    ];

    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          let data = null;//this.service.fields.slice();

          data = this.filterData(data);

          this.filteredData = [...data];

          data = this.sortData(data);

          // Grab the page's slice of data.
          const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
          return data.splice(startIndex, this._matPaginator.pageSize);
        }
        ));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[] {
    if (!this._matSort.active || this._matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._matSort.active) {
        case 'fieldCaption':
          [propertyA, propertyB] = [a.fieldCaption, b.fieldCaption];
          break;
          case 'addedBy':
          [propertyA, propertyB] = [a.addedBy, b.addedBy];
          break;
          case 'addedOn':
          [propertyA, propertyB] = [a.addedOn, b.addedOn];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}

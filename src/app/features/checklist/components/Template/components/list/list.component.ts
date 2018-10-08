import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { switchMap, map, takeUntil, distinctUntilChanged, debounceTime, take } from 'rxjs/operators';
import { FuseUtils } from '@core/utils';
import { ListService } from './list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditFormService } from '../editForm/editForm.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations
})
export class ListComponent implements OnInit {
  dataSource: FilesDataSource | null;
  displayedColumns: string[] = ['dataId', 'status', 'dueDate', 'addedOn', 'buttons'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  groupName: string;
  templateName: string;
  customEntityId: number;
  groupId: number;



  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _cevrecordsservice: ListService,
    private _recordService: EditFormService
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this._cevrecordsservice.onTemplatechanged
      .pipe(takeUntil(this._unsubscribeAll)).subscribe(x => {
        this.groupName = x.groupName;
        this.templateName = x.templateName;
        this.groupId = x.groupId;
        this._recordService.templateId.next(this.customEntityId);
      })


    this.dataSource = new FilesDataSource(this._cevrecordsservice, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.complete();
  }

  // addNew() {
  //   debugger;
  //   this._recordService.templateId.next(this.customEntityId);
  //   this.router.navigate(['/checklist/template/' + this.customEntityId + '/record/', 'new'], { queryParams: { templateId: this.customEntityId } });
  // }
}

export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');
  private _paginatedData = new BehaviorSubject('');

  constructor(
    private _cevrecordsservice: ListService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();
    this.filteredData = this._cevrecordsservice.recordsResult.data;
    this.paginatedData = this._cevrecordsservice.recordsResult.totalCount;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange
    ];

    this._matSort.sortChange.subscribe(() => this._matPaginator.pageIndex = 0)
    return merge(...displayDataChanges)
      .pipe(
        switchMap(() => {
          return this._cevrecordsservice.getRecords(this._matPaginator.pageIndex + 1, this._matPaginator.pageSize);
        }),
        map(() => {
          let data = this._cevrecordsservice.customEntityValues;

          data = this.filterData(data);

          this.filteredData = [...data];

          data = this.sortData(data);

          // Grab the page's slice of data.
          return data;
        }
        ));
  }

  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  get paginatedData() {
    return this._paginatedData.value;
  }

  set paginatedData(value: any) {
    this._paginatedData.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filterData(data): any {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  sortData(data): any[] {
    if (!this._matSort.active || this._matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._matSort.active) {
        case 'propertyReference':
          [propertyA, propertyB] = [a.propertyReference, b.propertyReference];
          break;
        case 'addressLine1':
          [propertyA, propertyB] = [a.addressLine1, b.userName];
          break;
        case 'addressLine2':
          [propertyA, propertyB] = [a.addressLine2, b.addressLine2];
          break;
        case 'postCode':
          [propertyA, propertyB] = [a.postCode, b.postCode];
          break;
        case 'city':
          [propertyA, propertyB] = [a.city, b.city];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect(): void {
  }
}
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable, Subject, fromEvent, BehaviorSubject, merge } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { PropertiesService } from './properties.service';
import { FuseUtils } from '@core/utils';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
  animations: fuseAnimations
})
export class PropertiesListComponent implements OnInit {
  dataSource: MatTableDataSource<any> | null;
  displayedColumns = ['checkbox','dataId', 'propertyReference', 'addressLine1', 'addressLine2', 'postCode', 'city', 'portfolioName', 'buttons'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;

  resultsLength: number;

  constructor(
    private _propertiesservice: PropertiesService
  ) {
    this._unsubscribeAll = new Subject();
  }
  //ngOnInit() {
  //   this.dataSource = new FilesDataSource(this._propertiesservice, this.paginator, this.sort);
  //   fromEvent(this.filter.nativeElement, 'keyup')
  //     .pipe(
  //       takeUntil(this._unsubscribeAll),
  //       debounceTime(150),
  //       distinctUntilChanged()
  //     )
  //     .subscribe(() => {
  //       debugger;
  //       if (!this.dataSource) {
  //         return;
  //       }
  //       this.dataSource.filter = this.filter.nativeElement.value;
  //     });
  // }
  ngOnInit() {
    this._propertiesservice.onPropertiesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        if (res) {
          debugger;
          this.dataSource = res.data;
          this.resultsLength = res.totalCount;
        }
      });

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page
      .pipe(
        tap(() => this._propertiesservice.getProperties(this.paginator.pageIndex + 1, this.paginator.pageSize))
      )
      .subscribe();
  }
}

export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');
  private _paginatedData = new BehaviorSubject('');

  constructor(
    private _propertiesservice: PropertiesService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    this.filteredData = this._propertiesservice.propertiesResult.data;
    this.paginatedData = this._propertiesservice.propertiesResult.totalCount;
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
          return this._propertiesservice.getProperties(this._matPaginator.pageIndex + 1, this._matPaginator.pageSize);
        }),
        map(() => {
          let data = this._propertiesservice.properties;

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
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { MenuListService } from './menu-list.service';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { FuseUtils } from '@core/utils';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  animations: fuseAnimations
})
export class MenuListComponent implements OnInit {
  dataSource: FilesDataSource | null;
  displayedColumns = ['id','title','url','parentMenuItemName','type','icon','hasChildren','sortOrder','isVisible','addedDate'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _menuListService: MenuListService
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this.dataSource = new FilesDataSource(this._menuListService, this.paginator, this.sort);
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
}

export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');
  private _paginatedData = new BehaviorSubject('');

  constructor(
    private _menuListService: MenuListService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    this.filteredData = this._menuListService.menuList;
    this.paginatedData = this._menuListService.menuList.length;
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
          return this._menuListService.getMenuItems();
        }),
        map(() => {
          let data = this._menuListService.menuList;

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
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'url':
          [propertyA, propertyB] = [a.url, b.url];
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

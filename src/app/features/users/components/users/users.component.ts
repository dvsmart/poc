import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { FuseUtils } from '@core/utils';
import { Observable, merge, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { map, takeUntil, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { UserService } from './user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: fuseAnimations
})
export class UsersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['username', 'email', 'firstName', 'lastName', 'roleType', 'isActive'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;
  resultsLength = 0;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _usersservice: UserService
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this._usersservice.onUsersChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        if (res) {
          this.dataSource = res.results;
          this.resultsLength = res.rowCount;
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
        tap(() => this._usersservice.getUsers(this.paginator.pageIndex + 1, this.paginator.pageSize))
      )
      .subscribe();
  }
}


export class ExampleHttpDao {
  constructor(private _userservice: UserService,
    private _matPaginator: MatPaginator) { }

  getData(): Promise<any> {
    return this._userservice.getUsers(this._matPaginator.pageIndex + 1, this._matPaginator.pageSize);
  }
}

export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');
  private _paginatedData = new BehaviorSubject('');

  constructor(
    private _userservice: UserService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();
    this.filteredData = this._userservice.usersResult.results;
    this.paginatedData = this._userservice.usersResult.rowCount;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      //this._userservice.onUsersChanged,
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange
    ];

    this._matSort.sortChange.subscribe(() => this._matPaginator.pageIndex = 0)
    return merge(...displayDataChanges)
      .pipe(
        switchMap(() => {
          return this._userservice.getUsers(this._matPaginator.pageIndex + 1, this._matPaginator.pageSize);
        }),
        map(() => {
          let data = this._userservice.users;
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
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'userName':
          [propertyA, propertyB] = [a.userName, b.userName];
          break;
        case 'emailAddress':
          [propertyA, propertyB] = [a.emailAddress, b.emailAddress];
          break;
        case 'firstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case 'roleName':
          [propertyA, propertyB] = [a.roleName, b.roleName];
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

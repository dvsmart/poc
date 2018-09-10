import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { MatPaginator, MatSort } from '../../../../../node_modules/@angular/material';
import { Subject, Observable, fromEvent, BehaviorSubject, merge } from '../../../../../node_modules/rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, startWith, tap } from '../../../../../node_modules/rxjs/operators';
import { DataSource } from '../../../../../node_modules/@angular/cdk/table';
import { AssessmentsService } from './assessments.service';
import { FuseUtils } from '@core/utils';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.scss'],
  animations: fuseAnimations
})

export class AssessmentListComponent implements OnInit {
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'dataId', 'title', 'reference', 'assessmentType', 'assessmentScope', 'assessmentDate', 'buttons'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _assessmentssservice: AssessmentsService
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this.dataSource = new FilesDataSource(this._assessmentssservice, this.paginator, this.sort);
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
  private data:any[];
  constructor(
    private _assessmentssservice: AssessmentsService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();
    this.filteredData = this._assessmentssservice.assessmentsResult.data;
    this.paginatedData = this._assessmentssservice.assessmentsResult.totalCount;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange
    ];

    this._matSort.sortChange.subscribe(() => this._matPaginator.pageIndex = 0);
    return merge(...displayDataChanges)
      .pipe(
        startWith({}),
        // switchMap(() => {
        //   debugger;
        //   return this._assessmentssservice.getAssessments(this._matPaginator.pageIndex + 1, this._matPaginator.pageSize);
        // }),
        map(() => {
          debugger;
          this._assessmentssservice.getAssessments(this._matPaginator.pageIndex + 1, this._matPaginator.pageSize)
            .then(() => {
              this.data = this._assessmentssservice.assessments;
              this.data = this.filterData(this.data);
              this.filteredData = [...this.data];
              this.data = this.sortData(this.data);
              // Grab the page's slice of data.
            })
          return this.data;
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
    this._filterChange.complete();
    this._filteredDataChange.complete();
    this._paginatedData.complete();
    this._filterChange.observers = [];
    this._filteredDataChange.observers = [];
    this._paginatedData.observers = [];
  }

}

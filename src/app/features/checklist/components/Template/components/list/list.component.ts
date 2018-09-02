import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { TemplateService } from '../../checklistTemplate.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['dataId', 'status', 'dueDate', 'addedOn'];
  exampleDatabase: CustomEntityInstanceDataSource | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  pageSize: number = 10;
  total: number;
  currentPage: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() editRecord = new EventEmitter<number>()
  constructor(private _checklistservice: TemplateService) {
  }

  ngOnInit() {
    this.exampleDatabase = new CustomEntityInstanceDataSource(this._checklistservice);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.data();
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => 
        {
          this.dataSource.data = data
        });
  }

  edit(row) {
    this.editRecord.emit(row.id);
  }
  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this._checklistservice.customEntityId.subscribe(x => {
      this._checklistservice.getcevRecords(x, this.currentPage, this.pageSize);
    })
  }
}

export class CustomEntityInstanceDataSource {
  constructor(private _customEntityGridService: TemplateService) { }

  data(){
    return this._customEntityGridService.cevRecords.asObservable();
  }
}
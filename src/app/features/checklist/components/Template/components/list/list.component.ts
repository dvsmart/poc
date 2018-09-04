import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { TemplateService, PagedResult } from '../../checklistTemplate.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, BehaviorSubject, Subject } from 'rxjs';
import { startWith, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['dataId', 'status', 'dueDate', 'addedOn', 'buttons'];
  dataSource: FilesDataSource | null;

  resultsLength = 0;
  isLoadingResults = false;

  pageSize: number;
  total: number;
  currentPage: number;

  private _unsubscribeAll: Subject<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() editRecord = new EventEmitter<number>()
  constructor(private _checklistservice: TemplateService,private toaster: MessageService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.dataSource = new FilesDataSource(this._checklistservice);
    this._checklistservice.result
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(result => {
        this.isLoadingResults = false;
        this.currentPage = result.currentPage;
        this.total = result.totalCount;
        this.pageSize = result.pageSize;
      });
  }

  edit(row) {
    this.editRecord.emit(row.id);
  }

  delete(id){
    this._checklistservice.deleteRecord(id).subscribe(x=>{
      if(x != null && x.saveSuccessful){
        this.toaster.add("Deleted successfully");
        this.refresh();
      }
    })
  }
  
  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
  }

  refresh(){
    this._checklistservice.customEntityId.subscribe(x => {
      this._checklistservice.getcevRecords(x, this.currentPage, this.pageSize);
    })
  }
}


export class FilesDataSource extends DataSource<any>
{
  constructor(private _customEntityGridService: TemplateService) {
    super();
  }

  connect(): Observable<any[]> {
    return this._customEntityGridService.onRecordsChanged;
  }

  disconnect(): void {
  }
}
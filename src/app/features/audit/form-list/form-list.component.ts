import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, fromEvent } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { FormListService } from './form-list.service';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  animations: fuseAnimations
})
export class FormListComponent implements OnInit {
  dataSource: MatTableDataSource<any> | null;
  displayedColumns: string[] = ['dataId', 'status', 'dueDate', 'createdOn', 'createdBy', 'modifiedOn', 'modifiedBy', 'buttons'];

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
  isLoading: boolean = false;
  resultsLength: number;
  private sub: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private route: ActivatedRoute,
    private _cevrecordsservice: FormListService,
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this.isLoading = true;
    this._cevrecordsservice.onTemplatechanged
      .pipe(takeUntil(this._unsubscribeAll)).subscribe(x => {
        this.groupName = x.categoryName;
        this.templateName = x.name;
        this.groupId = x.categoryId;
      })

    this._cevrecordsservice.onRecordsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data) {
          this.isLoading = false;
          this.dataSource = data.results;
          this.resultsLength = data.rowCount;
          this.dataSource.paginator = this.paginator;
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
    this.dataSource.sort = this.sort;
    this.paginator.page
      .pipe(
        tap(() => {
          this.isLoading = true;
          this._cevrecordsservice.getRecords(this.paginator.pageIndex + 1, this.paginator.pageSize)
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

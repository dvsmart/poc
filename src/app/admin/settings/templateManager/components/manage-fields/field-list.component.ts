import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { FieldResponse } from './field.model';
import { FieldsService } from './fields.service';

@Component({
  selector: 'fields',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss'],
  animations: fuseAnimations
})
export class FieldListComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  field: FieldResponse;

  displayedColumns: string[] = ['caption', 'controlType', 'tabName', 'isRequired', 'actions'];
  dataSource: MatTableDataSource<any>;

  isEdit: boolean = false;
  isLoading: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fieldservice: FieldsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.isLoading = true;
    this.fieldservice.onfieldsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  removeField(id){
    this.fieldservice.delete(id);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { FieldResponse } from './field.model';
import { SetupService } from '../manage-templates/setup.service';
import { FieldService } from './field-detail/field.service';

@Component({
  selector: 'field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss'],
  animations: fuseAnimations
})
export class FieldListComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  field: FieldResponse;

  displayedColumns: string[] = ['caption', 'controlType', 'tabName', 'templateName', 'isRequired', 'actions'];
  dataSource: MatTableDataSource<any>;

  isEdit: boolean = false;
  isLoading : boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fieldservice: FieldService) {
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

  editField(field) {
    this.isEdit = true;
    this.field = field;
  }

  addField() {
    this.isEdit = true;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
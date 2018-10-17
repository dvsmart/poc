import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldsService } from './fields.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-manage-fields',
  templateUrl: './manage-fields.component.html',
  styleUrls: ['./manage-fields.component.scss'],
  animations: fuseAnimations
})
export class ManageFieldsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['caption','controlType', 'actions'];
  dataSource: MatTableDataSource<any>;

  categoryName: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _fieldservice: FieldsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._fieldservice.fields
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
      });
  }

}

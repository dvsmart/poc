import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FieldsService } from './fields.service';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FieldsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  displayedColumns: string[] = ['caption', 'type', 'tabName', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fieldservice: FieldsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.fieldservice.fields
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

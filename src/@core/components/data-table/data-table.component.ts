import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DataTableComponent implements OnInit {

  @Input() source: any;

  @Input() columns: any[];

  @Input() pageSize = 10;
  @Input() pageSizeOptions = [20, 50, 100];
  length: number;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() rowClickEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.source == null) {
      throw Error('Table must be provided with data source.');
    }
    if (this.columns == null) {
      throw Error('Table must be provided with column definitions.');
    }
    this.displayedColumns = this.columns.map(column => column.name);
    this.length = this.source.rowCount;
    this.dataSource = new MatTableDataSource(this.source.results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  clickRowEvent(row: any){
    this.rowClickEvent.emit(row);
  }

}
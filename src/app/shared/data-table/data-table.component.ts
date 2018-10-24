import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DataTableComponent implements OnInit {

  @Input() ds: any;


  ngOnInit() {
    this.dataSource = this.ds;
  }

  
  dataSource: MatTableDataSource<any>;



}


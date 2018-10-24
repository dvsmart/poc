import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'risks',
  templateUrl: './risk-list.component.html',
  styleUrls: ['./risk-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class RiskListComponent implements OnInit {

  ngOnInit() {

  }
}
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'risks',
  templateUrl: './risk-list.component.html',
  styleUrls: ['./risk-list.component.scss'],
  animations: fuseAnimations,
})
export class RiskListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ngOnInit() {
  }

  onAddNew($event){
    alert("new button clicked");
  }
}

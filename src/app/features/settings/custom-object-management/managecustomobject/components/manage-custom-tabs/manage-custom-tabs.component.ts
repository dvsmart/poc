import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TabService } from './tab.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'manage-custom-tabs',
  templateUrl: './manage-custom-tabs.component.html',
  styleUrls: ['./manage-custom-tabs.component.scss'],
  animations:fuseAnimations
})
export class ManageCustomTabsComponent implements OnInit {
  templateName: string;
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['caption', 'actions'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private templateService: TabService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateService.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.templateName = response.templateName;
        this.dataSource = new MatTableDataSource(response.templateTabs);
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { TabsService } from './tabs.service';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:fuseAnimations
})
export class TabsComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  displayedColumns: string[] = ['caption', 'templateName', 'hidden', 'isOptional'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tabsService: TabsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.tabsService.tabs
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

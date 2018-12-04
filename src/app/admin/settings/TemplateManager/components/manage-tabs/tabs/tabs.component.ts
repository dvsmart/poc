import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabsService } from './tabs.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  animations: fuseAnimations
})
export class TabsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  tabs: any;
  templateId: number;

  displayedColumns: string[] = ['caption','templateName'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private tabsservice: TabsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.tabsservice.onTabsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.templateId = res.id;
        this.dataSource = new MatTableDataSource(res.templateTabs);
      })
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { TabRequest } from '../tab.model';
import { SetupService } from '../../manage-templates/setup.service';

@Component({
  selector: 'tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TabListComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  tabs: TabRequest[];
  displayedColumns: string[] = ['caption', 'actions'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private templateservice: SetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateservice.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(tabs => {
        if (tabs) {
          this.tabs = tabs.templateTabs;
        }
      })
  }

  readTab(tab): void {
    this.templateservice.setCurrentTab(tab, 'edit');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
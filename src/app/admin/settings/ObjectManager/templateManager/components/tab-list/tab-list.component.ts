import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { TabService } from './tabs.service';
import { TemplateSetupService } from '../template-setup/templatesetup.service';
import { Tab } from '../../models/tab.model';
import { TabResponse, TemplateResponse } from '../../models/template.model';

@Component({
  selector: 'tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
  animations: fuseAnimations
})
export class TabListComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  tabs: TabResponse[];
  displayedColumns: string[] = ['caption', 'actions'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private templateService: TemplateSetupService,private _tabservice: TabService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.templateService.customTabs
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(response => {
    //     this.tabs = response;
    //   });
      this.templateService.onSelectedTemplateChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response : TemplateResponse) => {
        debugger;
        this.tabs = response.tabs;
      });
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  readTab(tab): void
  {
      // Set current todo
      this._tabservice.setCurrentTab(tab);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

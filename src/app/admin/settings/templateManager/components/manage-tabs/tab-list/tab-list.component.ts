import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { TabService } from '../tabs.service';
import { TabResponse } from '../tab.model';
import { TemplateSetupService } from '../../template-setup/templatesetup.service';

@Component({
  selector: 'tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
      this.templateService.onSelectedTemplateChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response : any) => {
        this.tabs = response.tabs;
      });
  }

  readTab(tab): void
  {
      this._tabservice.setCurrentTab(tab);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

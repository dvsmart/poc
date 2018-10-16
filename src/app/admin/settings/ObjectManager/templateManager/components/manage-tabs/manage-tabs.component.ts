import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { TabService } from './tabs.service';
import { TemplateSetupService } from '../template-setup/templatesetup.service';

@Component({
  selector: 'app-manage-tabs',
  templateUrl: './manage-tabs.component.html',
  styleUrls: ['./manage-tabs.component.scss'],
  animations: fuseAnimations
})
export class ManageTabsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['caption', 'actions'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private templateService: TemplateSetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateService.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
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

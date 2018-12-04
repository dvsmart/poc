import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TemplatesService } from './templateList.service';

@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  animations: fuseAnimations
})
export class ManageTemplatesComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['name', 'totalTabs', 'actions'];
  dataSource: MatTableDataSource<any>;

  categoryName: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private templatesService: TemplatesService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templatesService.formTemplates
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.dataSource = new MatTableDataSource(response);
        }
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

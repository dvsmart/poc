import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TemplatesService } from './templates.service';

@Component({
  selector: 'app-manage-templates',
  templateUrl: './manage-templates.component.html',
  styleUrls: ['./manage-templates.component.scss'],
  animations:fuseAnimations
})
export class ManageTemplatesComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['templateName', 'actions'];
  dataSource: MatTableDataSource<any>;

  categoryName: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private templatesService: TemplatesService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templatesService.customTemplates
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.categoryName = response.groupName;
        this.dataSource = new MatTableDataSource(response.customTemplates);
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

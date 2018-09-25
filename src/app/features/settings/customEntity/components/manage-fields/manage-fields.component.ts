import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CustomentityService } from '../../service/customentity.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateTabField, TemplateTab } from '../../models/customEntity.model';

@Component({
  selector: 'manage-fields',
  templateUrl: './manage-fields.component.html',
  styleUrls: ['./manage-fields.component.scss']
})
export class ManageFieldsComponent implements OnInit {
  @Input() tabId: number;
  private _unsubscribeAll: Subject<any>;
  tabTitle: string;
  displayedColumns: string[] = ['id', 'name', 'type', 'isMandatory'];
  isLoading: boolean;
  resultsLength = 0;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ceAdminService: CustomentityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.isLoading = true;
    this.ceAdminService.getTabFields(this.tabId);
    this.ceAdminService.customTabFields
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        if (response) {
          this.isLoading = false;
          this.tabTitle = response.tabCaption;
          this.resultsLength = response.customFields.length;
          this.dataSource = new MatTableDataSource(response.customFields);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  makeRequired(id) {
    alert(id);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
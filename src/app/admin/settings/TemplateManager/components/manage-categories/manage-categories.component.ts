import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { CategoriesService } from './categories.service';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ManageCategoriesComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['groupName', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoriesService: CategoriesService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.categoriesService.onCategoriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

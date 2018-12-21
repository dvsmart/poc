import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { TabsService } from './tabs.service';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TabsComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  displayedColumns: string[] = ['caption', 'templateName', 'hidden', 'isOptional', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  constructor(private tabsService: TabsService, public _matDialog: MatDialog, private toaster: MatSnackBar) {
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


  deleteTab(tab: any): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this tab ' + tab.caption + '?';
    this.confirmDialogRef.componentInstance.extraConditionText = 'Delete all the fields belong to this tab?'
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.tabsService.deleteTab(tab.id).then(() => {
          this.toaster.open('Tab deleted successfully', 'Ok', { duration: 3000 });
        })
      }
      this.confirmDialogRef = null;
    });

  }
}

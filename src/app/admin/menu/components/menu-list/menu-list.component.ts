import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Subject, fromEvent } from 'rxjs';
import { MenuListService } from './menu-list.service';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class MenuListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['title', 'route', 'type', 'icon', 'parentName', 'isVisible', 'actions'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _menuListService: MenuListService,
    private _dialog: MatDialog,
    private toaster: MatSnackBar
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this._menuListService.onMenuItemsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(list => {
        this.dataSource = new MatTableDataSource<any>(list);
        this.dataSource.paginator = this.paginator;
      })

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  DeleteMenu(item: any) {
    const dialogRef = this._dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Menu ' +
      item.title + '? The menu item will be taken from your navigation menu';

    dialogRef.afterClosed().subscribe(result => {
      if (result && result != undefined) {
        this._menuListService.deleteMenuItem(item.id).then(x => {
          this.toaster.open("Menu deleted.", 'Done',
            { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        })
      }
    });
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
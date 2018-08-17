import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { PropertiesService } from '../properties.service';
import { takeUntil } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'properties-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit {
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedProperties: boolean;
    isIndeterminate: boolean;
    selectedProperties: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _propertiesservice: PropertiesService,
        public _matDialog: MatDialog
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this._propertiesservice.onSelectedPropertiesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedProperties => {
                this.selectedProperties = selectedProperties;
                setTimeout(() => {
                    this.hasSelectedProperties = selectedProperties.length > 0;
                    this.isIndeterminate = (selectedProperties.length !== this._propertiesservice.dataLength && selectedProperties.length > 0);
                }, 0);
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    selectAll(): void
    {
        this._propertiesservice.selectProperties();
    }


    deselectAll(): void
    {
        this._propertiesservice.deselectProperties();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected Properties?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    debugger;
                    this._propertiesservice.deleteSelectedProperties(this.selectedProperties);
                }
                this.confirmDialogRef = null;
            });
    }
}

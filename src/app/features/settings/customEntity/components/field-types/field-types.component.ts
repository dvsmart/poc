import { Component, OnInit } from '@angular/core';
import { FieldType } from '../../models/fieldtype.model';
import { Subject } from 'rxjs';
import { CustomFieldService } from '../../service/custom-field.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddCustomDialog } from '../categories/add.component';

@Component({
  selector: 'app-field-types',
  templateUrl: './field-types.component.html',
  styleUrls: ['./field-types.component.scss'],
  animations:fuseAnimations
})
export class FieldTypesComponent implements OnInit {
  fields: FieldType[];

  private _unsubscribeAll: Subject<any>;

  constructor(private _fieldService: CustomFieldService,public dialogRef: MatDialogRef<FieldTypesComponent>,public dialog: MatDialog) {
    this._unsubscribeAll = new Subject();
    this._fieldService.getFieldTypes();
  }

  ngOnInit() {
    this._fieldService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.fields = x
      });
  }

  onNoClick(id): void {
    this.dialogRef.close(id);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { TemplateSetupService } from '../template-setup/templatesetup.service';
import { FieldService } from './fields.service';
import { FieldResponse } from './field.model';
import { TemplateResponse } from '../../models/template.model';

@Component({
  selector: 'app-manage-fields',
  templateUrl: './manage-fields.component.html',
  styleUrls: ['./manage-fields.component.scss'],
  animations: fuseAnimations
})
export class ManageFieldsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  field: FieldResponse;
  displayedColumns: string[] = ['fieldCaption', 'isRequired', 'addedBy', 'addedOn', 'actions'];
  dataSource: MatTableDataSource<any>;
  templateId: number;
  isEdit: boolean = false;
  isDetail: boolean = false;
  fieldsCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private templateservice: TemplateSetupService, private fieldservice: FieldService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateservice.onSelectedTemplateChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: TemplateResponse) => {
        this.templateId = response.id;
        this.fieldsCount = response.fields.length;
        this.dataSource = new MatTableDataSource(response.fields);
        this.fieldservice.getFieldTypes();
      });
    this.fieldservice.onNewFieldAdded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([tabId, templateId]) => {
        if (tabId == undefined) {
          this.isEdit = false;
        }
      })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editField(field) {
    this.isEdit = true;
    this.field = field;
    this.isDetail = true;
  }

  addField() {
    this.isEdit = true;
    this.fieldservice.onNewFieldAdded.next(['', this.templateId]);
  }

}

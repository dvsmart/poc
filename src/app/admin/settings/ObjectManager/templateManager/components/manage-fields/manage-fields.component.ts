import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldsService } from './fields.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@core/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldResponse, TemplateResponse } from '../../models/template.model';
import { TemplateSetupService } from '../template-setup/templatesetup.service';

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

  categoryName: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private templateservice: TemplateSetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateservice.onSelectedTemplateChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: TemplateResponse) => {
        this.dataSource = new MatTableDataSource(response.fields);
      });
  }

  editField(field) {
    this.field = field;
  }

}

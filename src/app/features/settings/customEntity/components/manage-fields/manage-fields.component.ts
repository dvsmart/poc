import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CustomentityService } from '../../service/customentity.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateTabField, TemplateTab, CustomFieldModel } from '../../models/customEntity.model';
import { CustomFieldService } from '../../service/custom-field.service';
import { FieldTypesComponent } from '../field-types/field-types.component';
import { AddCustomDialog } from '../categories/add.component';

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
  customEntityId: BehaviorSubject<number>;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ceAdminService: CustomentityService,private fieldService: CustomFieldService,public dialog: MatDialog) {
    this._unsubscribeAll = new Subject();
    this.customEntityId = new BehaviorSubject(0);
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.isLoading = true;
    this.ceAdminService.getTabFields(this.tabId);
    this.loadCustomFields();
  }

  loadCustomFields(){
    this.ceAdminService.customTabFields
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        if (response) {
          this.isLoading = false;
          this.customEntityId.next(response.customEntityId);
          this.tabTitle = response.tabCaption;
          this.resultsLength = response.customFields.length;
          this.dataSource = new MatTableDataSource(response.customFields);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  addNewField(){
    this.fieldService.getFieldTypes();
    const dialogRef = this.dialog.open(FieldTypesComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(fieldTypeId => {
      console.log('The dialog was closed');
      if(fieldTypeId){
        const dialogRef = this.dialog.open(AddCustomDialog, {
          width: '300px',
          data: { name: "",type: 'field' }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result !== "" && result !== undefined) {
            var cfModel = new CustomFieldModel(this.tabId,result,fieldTypeId);
            cfModel.customEntityId = this.customEntityId.getValue();
            this.ceAdminService.CreateCustomField(cfModel);
          }
        });
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
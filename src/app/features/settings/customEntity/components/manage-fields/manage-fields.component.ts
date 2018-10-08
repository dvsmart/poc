import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CustomentityService } from '../../service/customentity.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomFieldModel } from '../../models/customEntity.model';
import { CustomFieldService } from '../../service/custom-field.service';
import { FieldTypesComponent } from '../field-types/field-types.component';
import { AddCustomDialog } from '../categories/add.component';
import { fuseAnimations } from '@core/animations';
import { FormControl } from '@angular/forms';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'manage-fields',
  templateUrl: './manage-fields.component.html',
  styleUrls: ['./manage-fields.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ManageFieldsComponent implements OnInit {
  @Input() tabId: number;
  private _unsubscribeAll: Subject<any>;
  tabTitle: string;
  displayedColumns: string[] = ['id', 'name', 'type', 'isMandatory'];
  isLoading: boolean;
  resultsLength = 0;
  customEntityId: BehaviorSubject<number>;
  searchInput: FormControl;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private ceAdminService: CustomentityService, 
    private fieldService: CustomFieldService, 
    public dialog: MatDialog,
    private coreSideBarService:FuseSidebarService,
    private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
    this.customEntityId = new BehaviorSubject(0);
    this.searchInput = new FormControl('');
  }

  ngOnInit() {
   this.route.params.subscribe(x=>{
     if(x["id"] != null || x["id"] != ''){
       debugger;
      this.ceAdminService.getCustomTabs(parseInt(x["id"]));
     }
   })
  
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.ceAdminService.onSearchTextChanged.next(searchText);
      });
    this.loadCustomFields();
  }

  loadCustomFields() {
    this.ceAdminService.customTabFields
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        if (response) {
          debugger;
          this.tabId = response.tabId;
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

  toggleSidebar(name): void {
    this.coreSideBarService.getSidebar(name).toggleOpen();
  }

  addNewField() {
    this.fieldService.getFieldTypes();
    const dialogRef = this.dialog.open(FieldTypesComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(fieldTypeId => {
      console.log('The dialog was closed');
      if (fieldTypeId) {
        const dialogRef = this.dialog.open(AddCustomDialog, {
          width: '300px',
          data: { name: "", type: 'field' }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result !== "" && result !== undefined) {
            var cfModel = new CustomFieldModel(this.tabId, result, fieldTypeId);
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
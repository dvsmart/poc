import { Component, OnInit } from '@angular/core';
import { Category, CustomTemplateTab, customGroupTemplate, CreateCustomTemplateRequest, CreateCustomTabRequest, CustomTabResponse } from '../../models/customEntity.model';
import { Subject } from 'rxjs';
import { CustomentityService } from '../../service/customentity.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { MatDialog } from '@angular/material';
import { AddCustomDialog } from './add.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: fuseAnimations
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  groupTemplate: customGroupTemplate;
  tabs: CustomTabResponse;
  private _unsubscribeAll: Subject<any>;

  showTemplate: boolean = false;
  showTab: boolean = false;

  constructor(private ceAdminService: CustomentityService, public dialog: MatDialog) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.ceAdminService.customGroups
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.categories = response;
      });
    this.ceAdminService.customTemplates
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.groupTemplate = response;
      });
    this.ceAdminService.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.tabs = response;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getTemplate(id) {
    this.showTab = false;
    this.showTemplate = true;
    this.ceAdminService.getCustomTemplates(id);
  }

  getTabs(id) {
    this.showTab = true;
    this.ceAdminService.getCustomTabs(id);
  }

  add(type, id?: number): void {
    const dialogRef = this.dialog.open(AddCustomDialog, {
      width: '250px',
      data: { name: "",type: type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== "" && result !== undefined) {
        if (type === 'category') {
          this.ceAdminService.addCustomGroup(result);
        }
        if (type === 'template') {
          let template = new CreateCustomTemplateRequest(id, result);
          this.ceAdminService.addCustomTemplate(template);
        }
        if (type === 'tab') {
          let tabRequest = new CreateCustomTabRequest(result,id);
          this.ceAdminService.addCustomTab(tabRequest);
        }
      }
    });
  }
}

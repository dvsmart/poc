import { Component, OnInit } from '@angular/core';
import { Category, CustomTemplateTab, customGroupTemplate, CreateCustomTemplateRequest, CreateCustomTabRequest, CustomTabResponse } from '../../models/customEntity.model';
import { Subject } from 'rxjs';
import { CustomentityService } from '../../service/customentity.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { MatDialog } from '@angular/material';
import { AddCustomDialog } from './add.component';
import { Router } from '@angular/router';

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
  loading_categories: boolean = false;
  loading_templates: boolean = false;
  loading_taps: boolean = false;

  showTemplate: boolean = false;
  showTab: boolean = false;
  showFieldsManagement: boolean = false;
  showFields: boolean = false;
  selectedTabId: number;

  constructor(private ceAdminService: CustomentityService, public dialog: MatDialog, private router: Router) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.loading_categories = true;
    this.ceAdminService.customGroups
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.categories = response;
        this.loading_categories = false;
      });
    this.ceAdminService.customTemplates
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.loading_templates = false;
        this.groupTemplate = response;
      });
    this.ceAdminService.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.loading_taps = false;
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
    this.ceAdminService.getTemplates(id);
  }

  getTabs(id) {
    this.showTab = true;
    this.ceAdminService.getCustomTabs(id);
  }

  manageFields(id) {
    this.showFieldsManagement = true;
    this.showFields = true;
    this.selectedTabId = id;
    this.router.navigate(['tab/', id]);
  }

  add(type, id?: number): void {
    const dialogRef = this.dialog.open(AddCustomDialog, {
      width: '250px',
      data: { name: "", type: type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== "" && result !== undefined) {
        if (type === 'category') {
          this.loading_categories = true;
          this.ceAdminService.addCustomGroup(result).then(() => { this.loading_categories = false; });
        }
        if (type === 'template') {
          this.loading_templates = true;
          let template = new CreateCustomTemplateRequest(id, result);
          this.ceAdminService.addCustomTemplate(template).then(() => { this.loading_templates = false; });
        }
        if (type === 'tab') {
          this.loading_taps = true;
          let tabRequest = new CreateCustomTabRequest(result, id);
          this.ceAdminService.addTemplateTab(tabRequest).then(() => { this.loading_taps = false; });
        }
      }
    });
  }
}

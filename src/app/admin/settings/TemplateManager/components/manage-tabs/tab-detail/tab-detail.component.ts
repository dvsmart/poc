import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { TabRequest } from '../tab.model';
import { SetupService } from '../../manage-templates/setup.service';
import { TabService } from './tab.service';
import { Location } from '@angular/common';

@Component({
  selector: 'tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TabDetailComponent implements OnInit {
  tab: TabRequest;
  formType: string;
  tabForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private templateservice: SetupService,
    private tabservice: TabService,
    private location: Location
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.tabForm = new FormGroup({});
  }

  ngOnInit() {
    this.tabservice.onSelectedTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([tab, formType]) => {
        if (tab && formType === 'edit') {
          this.formType = 'edit';
          this.tab = this.buildTabRequest(tab);
        }else{
          this.formType = 'new';
          this.tab = this.buildTabRequest(tab);
        }
        this.tabForm = this.createTabForm();
      });
  }

  buildTabRequest(data?) {
    debugger;
    const tabReq = new TabRequest();
    data = data || {};
    tabReq.customTemplateId = data.templateId;
    tabReq.tabId = data.id || 0;
    tabReq.caption = data.caption || '';
    tabReq.isVisible = data.isVisible || false;
    return tabReq;
  }

  createTabForm(): FormGroup {
    return this._formBuilder.group({
      caption: [this.tab.caption],
      isVisible: [this.tab.isVisible]
    });
  }

  saveTab() {
    var formData = this.tabForm.getRawValue();
    this.tab.caption = formData.caption;
    this.tab.isVisible = formData.isVisible;
    this.tabservice.addTab(this.tab);
    this.location.go('admin/customObject/templateManagement/2/details/' + this.tab.tabId);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

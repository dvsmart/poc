import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TabService } from './tab.service';
import { takeUntil } from 'rxjs/operators';
import { FormTab, TabRequest } from './tab';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  private tab: FormTab;
  tabForm: FormGroup;
  pageMode: string;
  formId: number;
  formTitle: string;
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder, private tabService: TabService, private toaster: MatSnackBar,
    private router: Location) {
    this._unsubscribeAll = new Subject();
    this.tab = new FormTab();
    this.pageMode = 'new';
  }

  ngOnInit() {
    this.route.parent.params.subscribe(x => {
      this.formId = x.id;
      this.formTitle = x.slug;
    })
    this.tabService.onTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response != '') {
          this.tab = new FormTab(response);
          this.pageMode = 'edit';
        } else {
          this.pageMode = 'new';
          this.tab = new FormTab();
        }
        this._buildTabForm();
      });
  }

  private _buildTabForm() {
    this.tabForm = this._formBuilder.group({
      id: new FormControl(this.tab.id),
      caption: new FormControl(this.tab.caption, Validators.required),
      hidden: new FormControl(this.tab.ishidden),
      isOptional: new FormControl(this.tab.isOptional),
      templateName: new FormControl({ value: this.formTitle, disabled: true }),
      formId: [this.formId]
    })
  }

  addTab(type) {
    let tabRequestModel = new TabRequest(this.tabForm.value);
    this.tabService.addTab(tabRequestModel, type).then((x:any) => {
      this.showToaster('Tab created successfully');
      if(type === 'save'){
        this.router.go(`/admin/form/builder/${this.formId}/${this.formTitle}/tabs/${x.id}`);
      }
    })
  }

  showToaster(msg: string) {
    this.toaster.open(msg, 'done', { duration: 3500 });
  }

  updateTab() {
    let tabRequestModel = new TabRequest(this.tabForm.value);
    this.tabService.updateTab(tabRequestModel).then(() => {
      this.showToaster('Tab updated successfully');
      this.router.go(`/admin/form/builder/${this.formId}/${this.formTitle}/tabs/${tabRequestModel.id}`);
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

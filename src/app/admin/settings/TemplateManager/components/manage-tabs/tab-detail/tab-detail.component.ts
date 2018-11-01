import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { TabRequest } from '../tab.model';
import { SetupService } from '../../manage-templates/setup.service';
import { TabService } from './tab.service';

import { async } from 'rxjs/internal/scheduler/async';

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
    private tabservice: TabService
  ) {
    this._unsubscribeAll = new Subject();
    this.tabForm = new FormGroup({});
  }

  ngOnInit() {
    this.tabservice.onSelectedTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((tab) => {
        if(tab){
          this.tab = new TabRequest(tab);
          this.tabForm = this.createTabForm();
        }
      });
  }

  createTabForm(): FormGroup {
    return this._formBuilder.group({
      caption: [this.tab.caption],
      isVisible: [this.tab.isVisible],
      isOptional:[this.tab.isOptional],
    });
  }

  saveTab() {
    var formData = this.tabForm.getRawValue();
    this.tab.caption = formData.caption;
    this.tab.isVisible = formData.isVisible;
    this.tabservice.addTab(this.tab);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

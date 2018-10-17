import { Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from '../tab-list/tab.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { TabService } from '../tab-list/tabs.service';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'tab-detail',
  templateUrl: './edit-tab.component.html',
  styleUrls: ['./edit-tab.component.scss'],
  animations: fuseAnimations
})
export class EditTabComponent implements OnInit {
  tab: Tab;
  formType: string;
  tabForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _tabservice: TabService,
    private _formBuilder: FormBuilder
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.tabForm = new FormGroup({});
  }

  ngOnInit() {
    this._tabservice.onCurrentTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([tab, formType]) => {
        if (tab != undefined && tab && formType === 'edit') {
          this.formType = 'edit';
          this.tab = tab;
          this.tabForm = this.createTabForm();
        } else {
          this.formType = 'new';
        }
      });
    this.tabForm.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this._tabservice.updateTask(data);
      });
  }

  createTabForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.tab.id],
      caption: [this.tab.caption],
    });
  }

  addTab() {
    this._tabservice.updateTask(this.tabForm.getRawValue());
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { TabResponse } from '../tab.model';
import { SetupService } from '../../manage-templates/setup.service';

@Component({
  selector: 'tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TabDetailComponent implements OnInit {
  tab: TabResponse;
  formType: string;
  tabForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private templateservice: SetupService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.tabForm = new FormGroup({});
  }

  ngOnInit() {
    this.templateservice.onCurrentTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([tab, formType]) => {
        if (tab) {
          if (formType === 'edit') {
            this.formType = 'edit';
            this.tab = new TabResponse(tab);
            this.tabForm = this.createTabForm();
          } else {
            this.formType = 'new';
            this.tab = new TabResponse(tab);
            this.tabForm = this.createTabForm();
          }
        }
      });

    this.tabForm.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.templateservice.addTab(data);
      });
  }

  createTabForm(): FormGroup {
    return this._formBuilder.group({
      tabName: [this.tab.tabName],
      isVisible: [this.tab.isVisible]
    });
  }

  saveTab() {
    var formData = this.tabForm.getRawValue();
    this.tab.tabName = formData.tabName;
    this.tab.isVisible = formData.isVisible;
    this.templateservice.addTab(this.tab);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

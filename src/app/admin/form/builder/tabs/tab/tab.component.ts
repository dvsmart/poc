import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TabService } from './tab.service';
import { takeUntil } from 'rxjs/operators';
import { FormTab } from './tab';

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
  pageMode:string;

  constructor(private _formBuilder: FormBuilder, private tabService: TabService) {
    this._unsubscribeAll = new Subject();
    this.tab = new FormTab();
    this.pageMode = 'new';
  }

  ngOnInit() {
    this.tabService.onTabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response != '') {
          this.tab = new FormTab(response);
          this.pageMode = 'edit'
        }
        this._buildTabForm();
      });
  }

  private _buildTabForm() {
    this.tabForm = this._formBuilder.group({
      id: new FormControl(this.tab.id),
      caption: new FormControl(this.tab.caption, Validators.required),
      isHidden: new FormControl(this.tab.ishidden),
      isOptional: new FormControl(this.tab.isOptional),
      templateName: new FormControl({ value: this.tab.templateName ? this.tab.templateName : '', disabled: true })
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

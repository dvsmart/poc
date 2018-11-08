import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FieldService } from './field.service';
import { FieldType, CreateTabFieldRequest, CreateTemplateFieldRequest } from '../field.model';
import { Location } from '@angular/common';
import { TabsService } from '../../manage-tabs/tabs/tabs.service';
import { SetupService } from '../../manage-templates/setup.service';

@Component({
  selector: 'field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.scss']
})
export class FieldDetailComponent implements OnInit {
  tabFieldRequest: CreateTabFieldRequest;
  templateFieldRequest: CreateTemplateFieldRequest;
  formType: string;
  fields: FieldType[];
  tabs: any;
  edit: boolean = false;

  form: FormGroup;


  private _unsubscribeAll: Subject<any>;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private fieldService: FieldService, private _location: Location, private templateservice: SetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.fieldService.onNewFieldAdded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((field: CreateTabFieldRequest) => {
        if (field) {
          this.edit = field.id === 0;
          this.tabFieldRequest = field;
        }
        this.createFieldForm();
      })

    this.fieldService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.fields = x
      });

    this.templateservice.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(tab => {
        this.tabs = tab.templateTabs;
      })
  }

  createFieldForm() {
    this.firstFormGroup = this._formBuilder.group({
      fieldType: [this.tabFieldRequest.controlTypeId, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: [this.tabFieldRequest.caption, Validators.required],
      tabId: [this.tabFieldRequest.tabId == undefined ? 0 : this.tabFieldRequest.tabId, Validators.required]
    });
    this.form = this._formBuilder.group({
      name: [this.tabFieldRequest.caption, Validators.required],
      fieldTypeId: [this.tabFieldRequest.controlTypeId],
      fieldType: [{ value: this.tabFieldRequest.controlType, disabled: true }],
      tabName: [{ value: this.tabFieldRequest.tabName, disabled: true }]
    })
  }

  saveField() {
    this.tabFieldRequest.caption = this.secondFormGroup.getRawValue().name;
    this.tabFieldRequest.controlTypeId = this.firstFormGroup.getRawValue().fieldType;
    this.tabFieldRequest.tabId = this.secondFormGroup.getRawValue().tabId;
    this.fieldService.addField(this.tabFieldRequest).then(() => {
      this._location.go('admin/setup/objectManager/templates/' + this.tabFieldRequest.templateId + '/fields');
    });
  }

}

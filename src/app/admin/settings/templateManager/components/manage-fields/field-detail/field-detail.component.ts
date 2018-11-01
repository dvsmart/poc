import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FieldService } from './field.service';
import { FieldType, CreateTabFieldRequest, CreateTemplateFieldRequest } from '../field.model';
import { Location } from '@angular/common';

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

  private _unsubscribeAll: Subject<any>;
  fieldTypes: string[] = ['Text Box', 'Text Area', 'Checkbox', 'Select'];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private fieldService: FieldService,private _location: Location) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.fieldService.onNewFieldAdded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((field) => {
        if (field) {
          this.tabFieldRequest = new CreateTabFieldRequest(field);
        }
        this.createFieldForm();
      })

    this.fieldService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.fields = x
      });
  }

  createFieldForm() {
    this.firstFormGroup = this._formBuilder.group({
      fieldType: [this.tabFieldRequest.controlTypeId, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: [this.tabFieldRequest.caption, Validators.required]
    });
  }

  saveField() {
    this.tabFieldRequest.caption = this.secondFormGroup.getRawValue().name;
    this.tabFieldRequest.controlTypeId = this.firstFormGroup.getRawValue().fieldType;
    this.fieldService.addField(this.tabFieldRequest);
  }

}

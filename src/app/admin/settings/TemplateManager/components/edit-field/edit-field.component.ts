import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FieldResponse, CreateFieldRequest, FieldType } from '../../models/template.model';
import { FieldService } from '../manage-fields/fields.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss']
})
export class EditFieldComponent implements OnInit {
  fieldRequest: CreateFieldRequest;
  formType: string;
  fields: FieldType[];

  private _unsubscribeAll: Subject<any>;
  fieldTypes: string[] = ['Text Box', 'Text Area', 'Checkbox', 'Select'];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private fieldService: FieldService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.fieldService.onNewFieldAdded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([tabId, templateId]) => {
        var fieldReq = {
          tabId: tabId,
          templateId: templateId,
        }
        this.fieldRequest = new CreateFieldRequest(fieldReq);
      })

    this.fieldService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.fields = x
      });


    this.firstFormGroup = this._formBuilder.group({
      fieldType: [this.fieldRequest.controlTypeId, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: [this.fieldRequest.caption, Validators.required]
    });
  }

  createFieldForm() {
    return this._formBuilder.group({
      name: [this.fieldRequest.caption, Validators.required],
      fieldType: [this.fieldRequest.controlTypeId, Validators.required],
      isVisible: [this.fieldRequest.isVisible],
      tabId: [this.fieldRequest.tabId]
    })
  }

  saveField() {
    this.fieldRequest.caption = this.secondFormGroup.getRawValue().name;
    this.fieldRequest.controlTypeId = this.firstFormGroup.getRawValue().fieldType;
    this.fieldService.addField(this.fieldRequest);
  }

}

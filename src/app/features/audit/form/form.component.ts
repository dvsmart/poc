import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Subject, config } from 'rxjs';
import { FormService } from './form.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { LiveFormResponse, LiveFormRecordRequest, FieldValue } from './form';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FieldConfig } from '@core/components/custom-controls/models/field.config';
import { FieldComponent } from 'app/admin/form/builder/fields/field/field.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: fuseAnimations
})
export class FormComponent implements OnInit {
  title: string;
  record: LiveFormResponse;
  pageType: string;
  customRecordForm: FormGroup = new FormGroup({});

  customEntityId: number;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _recordservice: FormService,
    private _location: Router,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this._recordservice.onRecordChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((x: LiveFormResponse) => {
        this.record = x;
        if (x.id === 0) {
          this.pageType = 'new';
          this.title = 'New ' + x.formName;
        } else {
          this.pageType = 'edit';
          this.title = 'Edit ' + this.record.formName + ' - ' + x.dataId;
        }
        this.customEntityId = this.record.formId;
        //this.customRecordForm = this.createRecordForm();
        this.getFields();
      })
  }

  config: FieldConfig[];

  getFields() {
    this.config = [];
    if (this.record.tabs == null) {
      return;
    }
    let tabs = this.record.tabs;
    tabs.forEach(t => {
      t.fields.forEach((f: any) => {
        let fieldAttribute = f.fieldAttributeDto;
        let fieldOptions = (f.liveFormFieldSpecificationDto != null && f.liveFormFieldSpecificationDto.fieldOptions != undefined) ? f.liveFormFieldSpecificationDto.fieldOptions : null;
        let opts = fieldOptions != "" ? JSON.parse(fieldOptions) : null
        this.config.push({
          label: f.caption,
          name: f.name,
          type: f.fieldType,
          disabled: fieldAttribute.readOnly,
          options: opts,
          placeholder: fieldAttribute.placeHolder,
          value: f.value,
        })
      });
    })
  }


  createRecordForm() {
    let group: any = {};
    if (this.record.tabs == null) {
      return new FormGroup({});
    }
    this.record.tabs.forEach(ct => {
      ct.fields.forEach(field => {
        if (field) {


          let fieldAttribute = field.fieldAttributeDto;
          if (fieldAttribute != null) {
            group[field.name] = fieldAttribute.isRequired ? new FormControl({ value: field.value || '', disabled: fieldAttribute.readOnly }, Validators.required)
              : new FormControl({ value: field.value || '', disabled: fieldAttribute.readOnly } || '');
          }
          if (field.fieldType == "Checkbox" && field.fieldSpectificDto != null && field.fieldSpectificDto.fieldOptions != null) {
            group[field.name] = this.fb.array(
              field.fieldSpectificDto.fieldOptions.map(x => {
                return this.fb.group({
                  name: x.id,
                  value: x.value ? x.value.indexOf(x.value) > - 1 : false
                })
              }));
          }
        }
      });
    })
    return new FormGroup(group);
  }

  populateData(): LiveFormRecordRequest {
    debugger;
    let formValue = this.customRecordForm.value;
    const fieldValues: FieldValue[] = [];
    var fv = JSON.parse(JSON.stringify(formValue));
    Object.keys(fv).forEach(function (prop) {
      fieldValues.push({ fieldKey: prop, value: fv[prop] });
    });

    const formModel: LiveFormRecordRequest = {
      id: 0,
      formId: this.record.formId,
      fieldValues: fieldValues
    }

    return formModel;
  }
  data: any;
  submit(event) {
    this.data = event;
  }

  saveRecord(): void {
    var record = this.populateData();
    this._recordservice.saveRecord(record).then((x: any) => {
      this._location.navigate(['audit/forms/' + x.formId + '/' + x.id]);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

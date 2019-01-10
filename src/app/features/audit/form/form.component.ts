import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormService } from './form.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { LiveFormResponse, LiveFormRecordRequest, FieldValue } from './form';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private _location: Router
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
        this.customRecordForm = this.createRecordForm();
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
          if (field.fieldAttributeDto != null) {
            group[field.name] = field.fieldAttributeDto.isRequired ? new FormControl(field.value || '', Validators.required)
              : new FormControl(field.value || '');
          } else {
            group[field.name] = new FormControl(field.value || '');
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

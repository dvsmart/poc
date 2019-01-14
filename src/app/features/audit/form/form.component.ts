import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormService } from './form.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { LiveFormResponse, LiveFormRecordRequest, FieldValue } from './form';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ValidationService } from '@core/components/custom-controls/models/validation.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

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
  customRecordForm: FormGroup;

  customEntityId: number;

  get changes() { return this.customRecordForm.valueChanges; }
  get valid() { return this.customRecordForm.valid; }
  get value() { return this.customRecordForm.value; }

  formErrors: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _recordservice: FormService,
    private _location: Router,
    private fb: FormBuilder,
    private toaster: MatSnackBar,
    private validationService: ValidationService
  ) {
    this._unsubscribeAll = new Subject();
    this.customRecordForm = new FormGroup({});
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
      })
    this.customRecordForm = this.createGroup();
  }



  createGroup() {
    const group = this.fb.group({});
    if (this.record.tabs == null) {
      return;
    }
    this.record.tabs.forEach(t => {
      t.fields.forEach(control => group.addControl(control.name, this.createControl(control)))
    })
    this.customRecordForm.valueChanges.subscribe((data) => {
      this.formErrors = this.validationService.validateForm(this.customRecordForm, this.formErrors, true)
    });
    return group;
  }

  createControl(config: any) {
    const { disabled, validation, value } = config;
    if ((config.type === 'checkbox') && config.fieldChoices != undefined) {
      return this.fb.array(
        config.fieldChoices.map(x => {
          return this.fb.group({
            name: x,
            value: value ? value.indexOf(x.id) > - 1 : false
          })
        }));
    }

    return this.fb.control({ disabled, value }, validation);
  }


  setDisabled(name: string, disable: boolean) {
    if (this.customRecordForm.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.customRecordForm.controls[name][method]();
      return;
    }
  }

  setValue(name: string, value: any) {
    this.customRecordForm.controls[name].setValue(value, { emitEvent: true });
  }

  populateData(): LiveFormRecordRequest {
    debugger;
    this.validationService.markFormGroupTouched(this.customRecordForm);
    if (this.customRecordForm.valid) {
      const result = { ...this.value };
      const fieldValues: FieldValue[] = [];
      Object.keys(result).forEach((key, index) => {
        if (result[key] != null) {
          if (typeof (result[key]) === 'object') {
            result[key] = result[key].filter(x => x.value).map(x => x.name.id).join(",");
          }
          fieldValues.push({ fieldKey: key, value: result[key] });
        }
        else {
          return;
        }
      })

      const formModel: LiveFormRecordRequest = {
        id: 0,
        formId: this.record.formId,
        fieldValues: fieldValues
      }

      return formModel;
    }
    else {
      this.validationService.validateForm(this.customRecordForm, this.formErrors, true);
      return null;
    }
  }


  saveRecord(): void {
    var record = this.populateData();
    if(record == null) return;
    this._recordservice.saveRecord(record).then((x: any) => {
      this._location.navigate(['audit/forms/' + this.customEntityId + '/' + x.id]);
      this.toaster.open("Record has been created successfully.", "Ok", { duration: 3000 });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

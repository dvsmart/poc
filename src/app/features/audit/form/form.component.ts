import { Component, OnInit } from '@angular/core';
import { CustomEntityRecord, CustomEntityValue } from 'app/features/audit/custom.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormService } from './form.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { LiveFormResponse } from './form';

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
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    this._recordservice.onRecordChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((x: LiveFormResponse) => {
        debugger;
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
        group[field.name] = field.fieldAttributeDto.isRequired ? new FormControl(field.value || '', Validators.required)
          : new FormControl(field.value || '');
      });
    })
    return new FormGroup(group);
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  populateData(): CustomEntityValue {
    let instance = new CustomEntityValue();
    instance.customEntityId = this.record.formId;
    var fv = JSON.parse(JSON.stringify(this.customRecordForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    return instance;
  }

  saveRecord(): void {
    var record = this.populateData();
    this._recordservice.saveRecord(record);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

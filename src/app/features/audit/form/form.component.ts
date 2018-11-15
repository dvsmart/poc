import { Component, OnInit } from '@angular/core';
import { CustomEntityRecord, CustomEntityValue } from 'app/features/audit/custom.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormService } from './form.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: fuseAnimations
})
export class FormComponent implements OnInit {
  title: string;
  record: any;
  pageType: string;
  customRecordForm: FormGroup;

  customEntityId: number;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _recordservice: FormService,
  ) {
    this._unsubscribeAll = new Subject();
    this.customRecordForm = new FormGroup({});
  }
  ngOnInit() {
    this._recordservice.onRecordChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.record = new CustomEntityRecord(x);
        this.customEntityId = this.record.customEntityId;
        this.pageType = 'edit';
        this.title = "Edit " + x.templateName + ' - ' + x.dataId;
        this.customRecordForm = this.createRecordForm();
      })
  }

  createRecordForm() {
    const group = this._formBuilder.group({});
    if (this.record.customTabs == null) {
      return new FormGroup({});
    }
    this.record.customTabs.forEach(ct => {
      ct.customFields.forEach(field => {
        const control = this._formBuilder.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      });
    })
    return group;
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
    instance.customEntityId = this.record.customEntityId;
    var fv = JSON.parse(JSON.stringify(this.customRecordForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    return instance;
  }

  saveRecord(): void {
    debugger;
    var record = this.populateData();
    this._recordservice.saveRecord(record);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

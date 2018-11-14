import { Component, OnInit } from '@angular/core';
import { CustomEntityRecord, CustomEntityValue } from 'app/features/checklist/models/custom.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormService } from './form.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SaveResponse } from 'app/features/checklist/components/Template/model/record.model';
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
  record: CustomEntityRecord;
  pageType: string;
  customRecordForm: FormGroup;

  customEntityId: number;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _recordservice: FormService,
    private route: ActivatedRoute
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.customRecordForm = new FormGroup({});
  }
  ngOnInit() {
    this._recordservice.onRecordChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        debugger;
        this.record = new CustomEntityRecord(x);
        this.pageType = 'edit';
        this.title = "Edit " + x.templateName + ' - ' + x.dataId;
      })
    this.customRecordForm = this.createRecordForm();

    // this.route.params.subscribe(x => {
    //   let cev = this._recordservice.onRecordChanged.getValue();
    //   if (x != null && x["id"] != "new") {
    //     debugger;
    //     this.record = new CustomEntityRecord(cev);
    //     this.pageType = 'edit';
    //     this.title = "Edit " + cev.templateName + ' - ' + cev.dataId;
    //   } else {
    //     this.pageType = 'new';
    //     this.title = "New " + cev.templateName;
    //     this.record = new CustomEntityRecord(cev);
    //   }
    //   this.customRecordForm = this.createRecordForm();
    // });
  }

  ngOnDestroy() {
    this._recordservice.onRecordChanged.complete();
    this._unsubscribeAll.complete();
  }

  createRecordForm() {
    const group = this._formBuilder.group({});
    if (this.record.customTabs == null) {
      return new FormGroup({});
    }
    this.record.customTabs.forEach(ct => {
      ct.fields.forEach(field => {
        if (field.type === "button") return;
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
    var fv = JSON.parse(JSON.stringify(this.customRecordForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    return instance;
  }

  saveRecord(): void {
    var record = this.populateData();
    record.customEntityId = this._recordservice.record.id;
    this._recordservice.add(record)
      .subscribe((res: SaveResponse) => {
        record.CustomEntityValueId = res.recordId;
        this.mapResponse(res);
        this._recordservice.updateFields(record).subscribe(() => {
          this.refresh();
        })
      });
  }

  refresh() {
    this.updateRecord();
    this.notify();
  }

  private notify(msg?: string) {
    this._matSnackBar.open('Record saved successfully', 'OK', {
      verticalPosition: 'top',
      duration: 2000
    });
  }

  private updateRecord() {
    this.title = 'Edit ' + this.record.templateName + ' - ' + this.record.dataId;
    this._recordservice.onRecordChanged.next(this.record);
  }

  private mapResponse(response: SaveResponse) {
    if (response.saveSuccessful) {
      this.record.id = response.recordId;
      this.record.dataId = response.savedDataId;
      this.record.customEntityId = response.savedEntityId;
    }
  }

}

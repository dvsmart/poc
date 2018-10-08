import { fuseAnimations } from "@core/animations";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomEntityRecord, CustomEntityValue } from "../../../../models/custom.model";
import { Subject } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { EditFormService } from "./editForm.service";
import { MatSnackBar } from "@angular/material";
import { Location } from '@angular/common';
import { SaveResponse } from "../../model/record.model";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  animations: fuseAnimations
})

export class EditFormComponent {
  title: string;
  record: CustomEntityRecord;
  pageType: string;
  customRecordForm: FormGroup;

  customEntityId: number;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _recordservice: EditFormService,
    private _location: Location,
    private route: ActivatedRoute
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.customRecordForm = new FormGroup({});
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      let cev = this._recordservice.onRecordChanged.getValue();
      if (x != null && x["id"] != "new") {
        this.record = new CustomEntityRecord(cev);
        this.pageType = 'edit';
        this.title = "Edit " + cev.templateName + ' - ' + cev.dataId;
      } else {
        debugger;
        this.pageType = 'new';
        this.title = "New " + cev.templateName;
        this.record = new CustomEntityRecord(cev);
      }
      this.customRecordForm = this.createRecordForm();
    });
  }

  ngOnDestroy() {
    this._recordservice.onRecordChanged.complete();
    this._unsubscribeAll.complete();
  }

  createRecordForm() {
    const group = this._formBuilder.group({});
    if(this.record.customTabs == null){
      return new FormGroup({});
    }
    this.record.customTabs.forEach(ct => {
      ct.customFields.forEach(field => {
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
    this._location.go('/checklist/template/' + this.record.customEntityId + '/record/' + this.record.id);
  }

  private mapResponse(response: SaveResponse) {
    if (response.saveSuccessful) {
      this.record.id = response.recordId;
      this.record.dataId = response.savedDataId;
      this.record.customEntityId = response.savedEntityId;
    }
  }
}
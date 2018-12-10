import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FieldService } from './field.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit {
  fieldTypeForm: FormGroup;
  fieldGeneralForm: FormGroup;
  fieldType: FieldType;
  fieldGeneralVisibility: FieldGeneralVisibility;

  private _unsubscribeAll: Subject<any>;
  fieldTypes: any;
  tabs: any;
  constructor(private _formBuilder: FormBuilder, private fieldService: FieldService) {
    this._unsubscribeAll = new Subject();
    this.fieldType = new FieldType();
    this.fieldGeneralVisibility = new FieldGeneralVisibility();
  }

  ngOnInit() {
    this.fieldService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.fieldTypes = response;
        }
      });

    this.fieldService.fieldTypeSpecification
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(r => {
        if (r) {
          this.fieldType = new FieldType(r);
          this.fieldGeneralVisibility = new FieldGeneralVisibility(r.fieldSpecificationVisibilityDto);
          this.buildFieldGeneralSettingsVisibility();
        }
      })

    this.fieldService.tabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(r => {
        if (r) {
          this.tabs = r;
        }
      })

    this.fieldTypeForm = this._formBuilder.group({
      fieldType: new FormControl('', Validators.required)
    });

    this.fieldGeneralForm = this._formBuilder.group({
      label: new FormControl('', Validators.required),
      tabId: new FormControl(''),
    });
  }

  buildFieldGeneralSettingsVisibility() {
    if (this.fieldGeneralVisibility.hidden) {
      this.fieldGeneralForm.addControl('hidden', new FormControl('', Validators.required));
    }
    if (this.fieldGeneralVisibility.isRequired) {
      this.fieldGeneralForm.addControl('isRequired', new FormControl('', Validators.required));
    }
    if (this.fieldGeneralVisibility.showDescription) {
      this.fieldGeneralForm.addControl('showDescription', new FormControl('', Validators.required));
    }
    if (this.fieldGeneralVisibility.placeholder) {
      this.fieldGeneralForm.addControl('placeholder', new FormControl('', Validators.required));
    }
    if (this.fieldGeneralVisibility.readOnly) {
      this.fieldGeneralForm.addControl('readOnly', new FormControl('', Validators.required));
    }
  }

  saveFieldType() {
    var selectedFieldType = this.fieldTypeForm.getRawValue();
    this.fieldService.getFieldType(selectedFieldType.fieldType);
  }

  saveField() {
    var formFieldData = this.fieldGeneralForm.getRawValue();
    var data = new CreateFieldRequest(formFieldData,this.fieldTypeForm.getRawValue().fieldType);
    this.fieldService.SaveField(data);
  }

}




export class CreateFieldRequest {
  id: string;
  label: string;
  tabId: number;
  description: string;
  isRequired: boolean;
  hidden: boolean;
  readonly: boolean;
  fieldTypeId: number;
  showDescription: string;
  placeHolder: string;

  constructor(data?,fieldtype?) {
    data = data || {};
    this.id = data.id || 0;
    this.label = data.label;
    this.tabId = data.tabId;
    this.description = data.showDescription;
    this.hidden = data.hidden;
    this.readonly = data.readOnly;
    this.fieldTypeId = fieldtype;
    this.showDescription = data.showDescription;
    this.placeHolder = data.placeholder;
  }
}


export class FieldType {
  type: string;

  constructor(data?) {
    data = data || {};
    this.type = data.type || '';
  }
}



export class FieldGeneralVisibility {
  isRequired: boolean;
  hidden: boolean;
  readOnly: boolean;
  showDescription: boolean;
  placeholder: boolean;

  constructor(data?) {
    data = data || {};
    this.hidden = data.hidden || false;
    this.readOnly = data.readOnly || false;
    this.isRequired = data.isRequired || false;
    this.placeholder = data.placeHolder || false;
    this.showDescription = data.showDescription || false;
  }
}
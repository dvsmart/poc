import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@core/components/custom-controls/components/custom-form/custom-form.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '@core/components/custom-controls/models/fieldConfig';
import { TemplateService } from '../../checklistTemplate.service';
import { Observable } from 'rxjs';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  animations:fuseAnimations
})
export class TemplateFormComponent implements OnInit {
  customForm: FormGroup;
  tabs: CustomTab[];
  recordId: number;
  record$: Observable<CustomEntityRecord>;
  record: CustomEntityRecord;

  @Input() id: number;

  @Output() close = new EventEmitter<boolean>(false);
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _checklistservice: TemplateService) {
    this.customForm = new FormGroup({});
  }

  ngOnChanges() {
    debugger;
    this._checklistservice.editRecord(this.id).subscribe(x => {
      this.record = x;
      this.customForm = this.createControl();
    });
  }

  ngOnInit() {
  }

  saveForm() {
    if (this.customForm.valid) {
      this.SaveRecord();
    } else {
      this.validateAllFormFields(this.customForm);
    }
  }

  SaveRecord() {
    let instance = new CustomEntityValue();
    var fv = JSON.parse(JSON.stringify(this.customForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    this._checklistservice.customEntityId.subscribe(x => instance.customEntityId = x);
    this._checklistservice.saveCustomEntity(instance);
  }

  createControl() {
    const group = this.fb.group({});
    this.record.customTabs.forEach(ct => {
      ct.customFields.forEach(field => {
        if (field.type === "button") return;
        const control = this.fb.control(
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

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  cancel(){
    this.close.emit(true);
  }

}



export class CustomField {
  fieldId: number;
  name: string;
  caption: string;
  sortOrder?: any;
  isVisible: boolean;
  type: string;
  value?: string;
  validations?: any[]

  constructor(data: any) {
    this.fieldId = data.fieldId;
    this.caption = data.caption;
    this.name = 'fieldId_' + data.fieldId;
    this.type = data.fieldType;
    this.sortOrder = data.sortOrder;
    this.isVisible = data.isVisible = true;
  }
}

export class CustomTab {
  tabId: number;
  caption: string;
  sortOrder?: any;
  isVisible: boolean;
  customFields: FieldConfig[];
}

export class CustomEntityRecord {
  id: number;
  dataId: string;
  customEntityId: number;
  customTabs: CustomTab[];
}


export class CustomEntityValue {
  customEntityId: number;
  CustomEntityValueId: number;
  id: number;
  fieldValues: Field[] = [];
  statusId: number = 1;
}

export class Field {
  id: string | number;
  value: string;
}

export interface CustomEntity {
  id: number
  tabs: CustomTab[]
}

export class CustomFieldDto {
  tabId: number;
  name: string;
  type: string | number;
  id: number;

}

export class CustomTabDto {
  customEntityId: number;
  caption: string;
  tabId: number;
  fields: FieldConfig[]

  /**
   *
   */
  constructor(obj: any) {
    if (obj == undefined) return;
    this.customEntityId = obj.customEntityId;
    this.caption = obj.caption;
    this.tabId = obj.id;
    this.fields = this.mapFields(obj.customFields);
  }

  mapFields(fields: any[]) {
    let cusFields: FieldConfig[] = [];
    fields.map(function (val) {
      cusFields.push({
        name: val.name,
        type: val.type,
        label: val.label,
        id: val.id,
        tabId: val.tabId,
        inputType: val.type
      })
    })
    return cusFields;
  }

  mapType(type) {
    switch (type) {
      case "TextBox":
        return "text";
      case "Calender":
        return "date";
      case "Picklist":
        return "select";
      case "TextArea":
        return "textarea";
      default:
        break;
    }
    return "text";
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@core/components/custom-controls/components/custom-form/custom-form.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '@core/components/custom-controls/models/fieldConfig';
import { TemplateService } from '../../checklistTemplate.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  customForm: FormGroup;
  tabs: CustomTab[];
  customEntityId: number;
  record: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _checklistservice: TemplateService) {
    this.customForm = new FormGroup({});
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      debugger;
      if (x != null && x["id"] != undefined) {
        const id = parseInt(x["id"]);
        this.customEntityId = id;
        this._checklistservice.getEntityRecord(id).subscribe(x => {
          debugger;
          this.record = x;
          this.populate(x);
          this.customForm = this.createControl();
        })
      }
    });
  }

  saveForm() {
    if (this.customForm.valid) {
      this.SaveRecord();
    } else {
      this.validateAllFormFields(this.customForm);
    }
  }

  SaveRecord() {
    let instance = new CustomEntityInstance();
    var fv = JSON.parse(JSON.stringify(this.customForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    instance.customEntityId = this.customEntityId;
    this._checklistservice.saveCustomEntity(instance);
  }



  populate(x) {
    this.tabs = [];
    if (x != null && x.length > 0) {
      for (let index = 0; index < x.length; index++) {
        this.tabs.push(new CustomTab(x[index]));
      }
    }
  }

  createControl() {
    debugger;
    const group = this.fb.group({});
    this.record.customTabs.forEach(t => {
      t.customFields.forEach(field => {
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

}



export class checklistRecord {
  id: number;
  dataId: string;
  customEntityId: number;
  customTabs: tab[]
}

export class tab {
  tabId: number;
  caption: string;
  sortOrder: number;
  isVisible: boolean;
  customFields: customField[];
}

export class customField {
  fieldId: number;
  caption: string;
  sortOrder: number;
  isVisible: boolean;
  fieldType: string
}


export class CustomEntityInstance {
  customEntityId: number;
  instanceId: number;
  fieldValues: Field[] = [];
}

export class Field {
  id: string | number;
  value: string;
}

export interface CustomEntity {
  id: number
  tabs: CustomTab[]
}

export class CustomField {
  tabId: number;
  name: string;
  type: string | number;
  id: number;

}

export class CustomTab {
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


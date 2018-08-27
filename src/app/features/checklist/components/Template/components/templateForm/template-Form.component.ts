import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  templates: Observable<any[]>;
  caption: Observable<string>;
  asyncTabs: Observable<CustomTab[]>;
  tabs: CustomTab[];
  customEntityId: number;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  constructor(private route: ActivatedRoute, private _checklistservice: TemplateService, private fb: FormBuilder) {
    this.customForm = new FormGroup({});
  }
  _regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      type: "select",
      label: "Country",
      name: "country",
      value: "UK",
      options: ["India", "UAE", "UK", "US"]
    },
    {
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    },
    {
      type: "button",
      label: "Save"
    }
  ];

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

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x != null && x["id"] != undefined) {
        const id = parseInt(x["id"]);
        this.customEntityId = id;
        // this._checklistservice.getCustomEntity(id).subscribe(x => {
        //   debugger;
        //   this.populate(x);
        //   this.customForm = this.createControl();
        // })
        this._checklistservice.getInstanceRecord(id);
        this._checklistservice.onSelectedTemplateChanged.subscribe(x=>{
          this.populate(x);
          this.customForm = this.createControl();
        });
      }
    });
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
    const group = this.fb.group({});
    this.tabs.forEach(t => {
      t.fields.forEach(field => {
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


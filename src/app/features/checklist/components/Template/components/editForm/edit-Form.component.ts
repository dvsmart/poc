import { fuseAnimations } from "@core/animations";
import { Component, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TemplateService } from "../../checklistTemplate.service";
import { MessageService } from "@core/services/message.service";
import { CustomEntityRecord, CustomEntityValue } from "../../../../models/custom.model";

@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  animations: fuseAnimations
})

export class EditFormComponent {
  customRecordForm: FormGroup;

  record: CustomEntityRecord;
  title: string;
  @Input() id: number;

  constructor(
    private fb: FormBuilder,
    private _checklistservice: TemplateService,
    private toaster: MessageService
  ) {
    this.customRecordForm = new FormGroup({});
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.id == null || this.id == undefined) {
      this._checklistservice.createRecord().subscribe(x => {
        this.title = "Create New "+ x.templateName;
        this.record = x;
        this.customRecordForm = this.createControl();
      });
    } else {
      this._checklistservice.editRecord(this.id).subscribe(x => {
        this.title = "Edit "+ x.templateName;
        this.record = x;
        this.customRecordForm = this.createControl();
      });
    }
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

  SaveRecord() {
    let instance = new CustomEntityValue();
    var fv = JSON.parse(JSON.stringify(this.customRecordForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    this._checklistservice.customEntityId.subscribe(x => instance.customEntityId = x);
    if (this.id == null) {
      this._checklistservice.createNewRecord(instance).subscribe(x => {
        if (x != null && x.saveSuccessful) {
          debugger;
          instance.CustomEntityValueId = x.recordId
          this.title = 'Edit Record -  ' + x.savedDataId;
          this.toaster.add('Record Added successfully. Updating fields...');
          this._checklistservice.saveCustomFields(instance).subscribe(response => {
            if (response != null && response.saveSuccessful) {
              this.toaster.add('Saved Successfully');
              this._checklistservice.getcevRecords(instance.customEntityId, 1, 10);
            } else {
              this.toaster.add('Saving fields failed.');
            }
          })
        } else {
          this.toaster.add('Oops! Something went wrong. Please try again');
        }
      })
    } else {
      instance.CustomEntityValueId = this.id;
      this._checklistservice.saveCustomFields(instance).subscribe(x => {
        debugger;
        if (x != null && x['SaveSuccessful']) {
          this.toaster.add('Saved Successfully');
          this._checklistservice.getcevRecords(instance.customEntityId, 1, 10);
        }
      });
    }


  }
}
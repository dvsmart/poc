import { fuseAnimations } from "@core/animations";
import { Component, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TemplateService } from "../../checklistTemplate.service";
import { MessageService } from "@core/services/message.service";
import { CustomEntityRecord } from "../templateForm/template-Form.component";

@Component({
    selector: 'edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss'],
    animations: fuseAnimations
})

export class EditFormComponent {
    customRecordForm: FormGroup;

    record: CustomEntityRecord;

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
        this._checklistservice.editRecord(this.id).subscribe(x => {
            this.record = x;
            this.customRecordForm = this.createControl();
        });
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
}
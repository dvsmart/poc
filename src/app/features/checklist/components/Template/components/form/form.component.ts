import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplateService } from '../../checklistTemplate.service';
import { CustomEntityRecord, CustomEntityValue } from '../templateForm/template-Form.component';
import { fuseAnimations } from '@core/animations';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: fuseAnimations
})
export class FormComponent implements OnInit {
  record: CustomEntityRecord;
  customForm: FormGroup;
  title: string = 'New Record'

  @Input() id: number;

  @Output() close = new EventEmitter<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private _checklistservice: TemplateService,
    private toaster: MessageService) {
    this.customForm = new FormGroup({});
  }

  ngOnInit() {
  }



  ngOnChanges() {
    this._checklistservice.createRecord(this.id).subscribe(x => {
      this.record = x;
      this.customForm = this.createControl();
    });
  }

  SaveRecord() {
    let instance = new CustomEntityValue();
    var fv = JSON.parse(JSON.stringify(this.customForm.value));
    Object.keys(fv).forEach(function (prop) {
      var id = parseInt(prop.split("_")[1]);
      instance.fieldValues.push({ id: id, value: fv[prop] });
    });
    this._checklistservice.customEntityId.subscribe(x => instance.customEntityId = x);
    this._checklistservice.createNewRecord(instance).subscribe(x => {
      if (x != null && x.saveSuccessful) {
        debugger;
        instance.CustomEntityValueId = x.recordId
        this.title = 'Edit Record -  ' + x.savedDataId;
        this.toaster.add('Record Added successfully. Updating fields...');
        this._checklistservice.saveCustomFields(instance).subscribe(response => {
          if(response! = null && response.saveSuccessful){
            this.toaster.add('Saved Successfully');
            this._checklistservice.getcevRecords(instance.customEntityId, 1, 10);
          }else{
            this.toaster.add('Saving fields failed.');
          }
        })
      }else{
        this.toaster.add('Oops! Something went wrong. Please try again');
      }
    })
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

  cancel() {
    this.close.emit(true);
  }

}

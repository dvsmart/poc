import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplateService } from '../../checklistTemplate.service';
import { CustomEntityRecord, CustomEntityValue } from '../templateForm/template-Form.component';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations:fuseAnimations
})
export class FormComponent implements OnInit {
  record:CustomEntityRecord;
  customForm: FormGroup;

  @Input() id: number;

  @Output() close =  new EventEmitter<boolean>(false);
  
  constructor(
    private fb: FormBuilder,
    private _checklistservice: TemplateService) { 
      this.customForm = new FormGroup({});
    }

  ngOnInit() {
  }

  

  ngOnChanges(){
    this._checklistservice.createRecord(this.id).subscribe(x=> {
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
    this._checklistservice.customEntityId.subscribe(x=> instance.customEntityId = x);
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

  cancel(){
    this.close.emit(true);
  }

}

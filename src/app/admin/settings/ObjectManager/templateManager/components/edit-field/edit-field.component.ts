import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FieldResponse } from '../../models/template.model';

@Component({
  selector: 'edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss']
})
export class EditFieldComponent implements OnInit {
  @Input() field: FieldResponse;
  formType:string;

  fieldTypes: string[] = ['Text Box', 'Text Area', 'Checkbox', 'Select'];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    debugger;
    if(this.formType == 'new'){
      this.firstFormGroup = this._formBuilder.group({
        fieldType: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        name: ['', Validators.required]
      });  
    }else{
      this.firstFormGroup = this._formBuilder.group({
        fieldType: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        name: [this.field.fieldCaption, Validators.required]
      });
    }
    
  }



}

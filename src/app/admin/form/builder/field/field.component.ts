import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FieldService } from './field.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  fieldTypeForm: FormGroup;
  fieldGeneralForm: FormGroup;
  fieldSpec: FieldSpecificVisibility;

  private _unsubscribeAll: Subject<any>;
  fieldTypes: any;
  constructor(private _formBuilder: FormBuilder, private fieldService: FieldService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.fieldService.fieldTypes
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.fieldTypes = response;
        }
      });

    this.fieldTypeForm = this._formBuilder.group({
      fieldType: new FormControl('', Validators.required)
    });
    this.fieldSpec = new FieldSpecificVisibility();
    this.fieldGeneralForm = this._formBuilder.group({
      label: new FormControl('', Validators.required),
      tabId: new FormControl(''),
    });

    if (this.fieldSpec.hidden) {
      this.fieldGeneralForm.addControl('hidden', new FormControl('', Validators.required));
    }
    if (this.fieldSpec.isRequired) {
      this.fieldGeneralForm.addControl('isRequired', new FormControl('', Validators.required));
    }
    if (this.fieldSpec.showDescription) {
      this.fieldGeneralForm.addControl('showDescription', new FormControl('', Validators.required));
    }
    if (this.fieldSpec.placeholder) {
      this.fieldGeneralForm.addControl('placeholder', new FormControl('', Validators.required));
    }
    if (this.fieldSpec.readOnly) {
      this.fieldGeneralForm.addControl('readOnly', new FormControl('', Validators.required));
    }
  }

}

export class FieldSpecificVisibility {
  isRequired: boolean;
  hidden: boolean;
  readOnly: boolean;
  showDescription: boolean;
  placeholder: boolean;

  constructor(data?) {
    data = data || {};
    this.hidden = true;
    this.readOnly = true;
    this.isRequired = true;
    this.placeholder = true;
    this.showDescription = true;
  }
}
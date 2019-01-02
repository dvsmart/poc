import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FieldService } from './field.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FieldType, FieldGeneralVisibility, FieldSpecificVisibility, FormFieldRequestModel, FieldOptionRequestModel, FormFieldSpecificRequestModel } from '../field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit {
  fieldTypeForm: FormGroup;
  fieldGeneralForm: FormGroup;
  fieldSpecificForm: FormGroup;
  fieldType: FieldType;
  fieldGeneralVisibility: FieldGeneralVisibility;
  fieldSpecificVisibility: FieldSpecificVisibility;

  validationErrorMessage:string;

  private _unsubscribeAll: Subject<any>;
  fieldTypes: any;
  tabs: any;
  fieldOption:any[];
  option:string = '';

  constructor(private _formBuilder: FormBuilder, private fieldService: FieldService) {
    this._unsubscribeAll = new Subject();
    this.fieldType = new FieldType();
    this.fieldGeneralVisibility = new FieldGeneralVisibility();
    this.fieldSpecificVisibility = new FieldSpecificVisibility();
    this.fieldSpecificForm = new FormGroup({});
    this.fieldOption = [];
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

    this.fieldGeneralForm = this._formBuilder.group({
      label: new FormControl('', Validators.required),
      tabId: new FormControl(''),
    });
  }

  addOption(value){
    this.fieldOption.push(value);
  }

  fieldTypeChange(e){
    if(e.value !== null){
      this.validationErrorMessage = '';
      this.fieldService.getFieldtypeAsync(e.value)
      .subscribe(r => {
        if (r != undefined && r != null && r !== {}) {
          this.fieldType = new FieldType(r);
          this.fieldGeneralVisibility = new FieldGeneralVisibility(r.fieldSpecificationVisibilityDto);
          this.fieldSpecificVisibility = new FieldSpecificVisibility(r.fieldSpecificSpecificationVisibilityDto);
          this.buildFieldGeneralSettingsVisibility();
          this.buildFieldSpecificAttributesVisibility();
          this.tabs = this.fieldService.getTabsAsync();
        }
      });
    }
  }
 
  buildFieldGeneralSettingsVisibility() {
    if (this.fieldGeneralVisibility.hidden) {
      this.fieldGeneralForm.addControl('hidden', new FormControl(''));
    }
    if (this.fieldGeneralVisibility.isRequired) {
      this.fieldGeneralForm.addControl('isRequired', new FormControl(''));
    }
    if (this.fieldGeneralVisibility.showDescription) {
      this.fieldGeneralForm.addControl('description', new FormControl(''));
    }
    if (this.fieldGeneralVisibility.placeholder) {
      this.fieldGeneralForm.addControl('placeholder', new FormControl(''));
    }
    if (this.fieldGeneralVisibility.readOnly) {
      this.fieldGeneralForm.addControl('readOnly', new FormControl(''));
    }
  }

  buildFieldSpecificAttributesVisibility(){
    if(this.fieldSpecificVisibility.minimumValue){
      this.fieldSpecificForm.addControl('minimumValue', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.maximumValue){
      this.fieldSpecificForm.addControl('maximumValue', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.maximumRows){
      this.fieldSpecificForm.addControl('maximumRows', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.defaultValue){
      this.fieldSpecificForm.addControl('defaultValue', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.fileTypes){
      this.fieldSpecificForm.addControl('fileTypes', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.currency){
      this.fieldSpecificForm.addControl('currency', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.fieldOptions){
      this.fieldSpecificForm.addControl('fieldOptions', new FormControl(''));
    }
    if(this.fieldSpecificVisibility.colspan){
      this.fieldSpecificForm.addControl('colspan', new FormControl(''));
    }
  }

  GetFieldTypeSpecification() {
    var selectedFieldType = this.fieldTypeForm.value;
    if(selectedFieldType.fieldType === '' || selectedFieldType.fieldType === null){
      this.validationErrorMessage = 'Field Type is required. Please choose a field type.';
      return;
    }
  }

  saveField() {
    var formFieldData = this.fieldGeneralForm.value;
    var data = new FormFieldRequestModel(formFieldData);
    data.fieldTypeId = this.fieldTypeForm.value.fieldType;
    data.formFieldSpecificRequestModel = new FormFieldSpecificRequestModel(this.fieldSpecificForm.value);
    this.fieldOption.forEach(element => {
      var option = new FieldOptionRequestModel(element);
      data.formFieldSpecificRequestModel.fieldOptions.push(option);
    });
    this.fieldService.SaveField(data);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
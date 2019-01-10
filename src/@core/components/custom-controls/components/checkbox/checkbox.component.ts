import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/fieldConfig";

@Component({
  selector: "app-checkbox",
  templateUrl:'./checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  field: any;
  group: FormGroup;
  options:any[] = null;
  constructor() {}
  ngOnInit() {
    this.options = [];
    if(this.field.liveFormFieldSpecificationDto != null  && this.field.liveFormFieldSpecificationDto.fieldOptions != null){
      this.options = JSON.parse(this.field.liveFormFieldSpecificationDto.fieldOptions);
    }
  }
}
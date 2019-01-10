import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-select",
  templateUrl:'./select.component.html',
})
export class SelectComponent implements OnInit {
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
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MyErrorStateMatcher } from "../../models/fieldConfig";

@Component({
  selector: "app-input",
  templateUrl: './textbox.component.html'
})
export class InputComponent implements OnInit {
  field: any;
  hint: string;
  group: FormGroup;
  validationMessage: string;
  required: boolean = false;
  disabled: boolean = false;
  placeHolder: string;
  maximumLength:number;
  matcher: any;
  constructor() { }
  ngOnInit() {

    if (this.field.fieldAttributeDto != null) {
      if (this.field.fieldAttributeDto.showHint || this.field.fieldAttributeDto.hint) {
        this.hint = this.field.fieldAttributeDto.hint;
      }
      this.required = this.field.fieldAttributeDto.isRequired;
      this.disabled = this.field.fieldAttributeDto.readOnly;
      this.placeHolder = this.field.fieldAttributeDto.placeHolder != '' ? this.field.fieldAttributeDto.placeHolder : this.field.caption;
    }
    if(this.field.liveFormFieldSpecificationDto != null){
      this.maximumLength = this.field.liveFormFieldSpecificationDto.maximumValue == 0 ? 200 : this.field.liveFormFieldSpecificationDto.maximumValue;
    }
    this.matcher = new MyErrorStateMatcher();
  }
}



import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MyErrorStateMatcher } from "../../models/fieldConfig";

@Component({
  selector: "app-textarea",
  templateUrl: './textarea.component.html'
})
export class TextAreaComponent implements OnInit {
  field: any;
  group: FormGroup;
  maximumLength: number = 500;
  hint: string;
  required: boolean = false;
  disabled: boolean = false;
  placeHolder: string;
  matcher: any;
  constructor() { }
  ngOnInit() {
    if (this.field.liveFormFieldSpecificationDto != null) {
      this.maximumLength = this.field.liveFormFieldSpecificationDto.maximumValue == 0 ? 500 : this.field.liveFormFieldSpecificationDto.maximumValue;
    }
    if (this.field.fieldAttributeDto != null) {
      if (this.field.fieldAttributeDto.showHint || this.field.fieldAttributeDto.hint) {
        this.hint = this.field.fieldAttributeDto.hint;
      }
      this.required = this.field.fieldAttributeDto.isRequired;
      this.disabled = this.field.fieldAttributeDto.readOnly;
      this.placeHolder = this.field.fieldAttributeDto.placeHolder != '' ? this.field.fieldAttributeDto.placeHolder : this.field.caption;
    }
    this.matcher = new MyErrorStateMatcher();
  }
}
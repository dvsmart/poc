import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from "../../models/field.interface";
import { FieldConfig } from "../../models/field.config";

@Component({
  selector: "app-textarea",
  templateUrl: './textarea.component.html'
})
export class TextAreaComponent implements Field{
  config: FieldConfig;
  group: FormGroup;
}
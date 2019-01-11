import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from "../../models/field.interface";
import { FieldConfig } from "../../models/field.config";

@Component({
  selector: "app-select",
  templateUrl:'./select.component.html',
})
export class SelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
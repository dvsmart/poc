import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/field.config";

@Component({
  selector: "app-input",
  templateUrl: './textbox.component.html'
})
export class InputComponent {
  config: FieldConfig;
  group: FormGroup;
}



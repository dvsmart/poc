import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/field.config";

@Component({
  selector: "app-checkbox",
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  config: FieldConfig;
  group: FormGroup;

  ngOnInit(){
   
    var field = this.config;
  }
}
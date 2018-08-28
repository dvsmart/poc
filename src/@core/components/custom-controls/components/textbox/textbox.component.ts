import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/fieldConfig";

@Component({
  selector: "app-input",
  template: `
<mat-form-field class="demo-full-width" [formGroup]="group">
<input matInput [formControlName]="field.name" [placeholder]="field.caption" [type]="field.type">
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
</ng-container>
</mat-form-field>
`,
  styles: [`.demo-full-width{
    width: 100%
  }`]
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
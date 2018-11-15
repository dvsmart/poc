import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/fieldConfig";

@Component({
  selector: "app-textarea",
  template: `
<mat-form-field class="demo-full-width" fxFlex="100" appearance="outline" [formGroup]="group">
<mat-label>{{field.caption}}</mat-label>
<textarea matInput [formControlName]="field.name" [placeholder]="field.caption"></textarea>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
</ng-container>
</mat-form-field>
`,
  styles: [`.demo-full-width{
    width: 100%
  }`]
})
export class TextAreaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
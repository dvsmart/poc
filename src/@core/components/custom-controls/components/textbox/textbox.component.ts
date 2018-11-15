import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../models/fieldConfig";

@Component({
  selector: "app-input",
  template: `
    <mat-form-field [formGroup]="group" fxFlex="100" appearance="outline" class="demo-full-width">
    <mat-label>{{field.caption}}</mat-label>
    <input matInput [formControlName]="field.name" [placeholder]="field.caption">
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
  constructor() { }
  ngOnInit() { }
}


// <button mat-button *ngIf="group.touched" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
//     <mat-icon>close</mat-icon>
//     </button>
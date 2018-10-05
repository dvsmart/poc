import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'AddCategoryDialog',
    template: `<h1 mat-dialog-title>Add New {{title}}</h1>
    <div mat-dialog-content>
      <p>What's your favorite {{title}}?</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>Ok</button>
    </div>`,
})
export class AddCustomDialog {
    title: string
    constructor(
        public dialogRef: MatDialogRef<AddCustomDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        switch (data.type) {
            case 'category':
                this.title = 'Category'
                break;
            case 'template':
                this.title = 'Template'
                break;
            case 'tab':
                this.title = 'Tab'
                break;
            case 'field':
                this.title = 'Field'
                break;
            default:
                break;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
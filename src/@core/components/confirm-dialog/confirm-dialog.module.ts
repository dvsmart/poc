import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatCheckboxModule } from '@angular/material';

import { FuseConfirmDialogComponent } from './confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        FuseConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        FormsModule
    ],
    entryComponents: [
        FuseConfirmDialogComponent
    ],
})
export class FuseConfirmDialogModule
{
}

import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatCheckboxModule } from '@angular/material';

import { FuseConfirmDialogComponent } from './confirm-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        FuseConfirmDialogComponent
    ],
    imports: [
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

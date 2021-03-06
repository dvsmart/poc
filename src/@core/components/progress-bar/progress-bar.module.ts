import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { CoreProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        CoreProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports     : [
        CoreProgressBarComponent
    ]
})
export class FuseProgressBarModule
{
}

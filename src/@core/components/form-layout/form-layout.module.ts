import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@core/directives/directives';
import { MatIconModule, MatButtonModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormLayoutComponent } from './form-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        RouterModule
    ],
    declarations: [
        FormLayoutComponent
    ],
    exports: [
        FormLayoutComponent
    ],

})
export class FormLayoutModule {
}
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatNativeDateModule, MatListModule, MatIconModule, MatCardModule, MatDatepickerModule, MatOptionModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { ButtonComponent } from './components/button/button.component';
import { DynamicFormComponent } from './custom-form.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateComponent } from './components/calender/calender.component';
import { RadiobuttonComponent } from './components/radio/radio.component';
import { InputComponent } from './components/textbox/textbox.component';
import { DynamicFieldDirective } from './directives/custom-field.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextAreaComponent } from './components/textarea/textarea.component';

const fieldComponents = [
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    DateComponent,
    RadiobuttonComponent,
    TextAreaComponent
];


@NgModule({
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        ...fieldComponents
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatRadioModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: fieldComponents
})
export class CustomControlsModule {
}

import { NgModule } from '@angular/core';
import { ChecklistService } from './services/checklist.service';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistComponent } from './checklist.component';
import { CoreSharedModule } from '@core/core.module';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';
import { DynamicFormComponent } from '@core/components/custom-controls/components/custom-form/custom-form.component';
import { InputComponent } from '@core/components/custom-controls/components/textbox/textbox.component';
import { RadiobuttonComponent } from '@core/components/custom-controls/components/radio/radio.component';
import { TextAreaComponent } from '@core/components/custom-controls/components/textarea/textarea.component';
import { SelectComponent } from '@core/components/custom-controls/components/select/select.component';
import { DateComponent } from '@core/components/custom-controls/components/calender/calender.component';
import { CheckboxComponent } from '@core/components/custom-controls/components/checkbox/checkbox.component';
import { CustomMaterialModule } from './custom-material.module';
import { resolve } from 'url';

const routes: Routes = [
  {
    path: '',
    redirectTo:'categories'
  },
  {
    path: 'categories',
    loadChildren: './components/category-list/category-list.module#CategoryListModule',
  },
  {
    path: 'cat/:id',
    loadChildren:'./components/template-list/template-list.module#TemplateListModule',
  },
  {
    path: 'template/:id',
    loadChildren: './components/Template/template.module#TemplateModule'
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    CustomControlsModule,
    CustomMaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [ChecklistService],
  declarations: [ChecklistComponent],
  entryComponents:[
    DynamicFormComponent,
    InputComponent,
    RadiobuttonComponent,
    TextAreaComponent,
    SelectComponent,
    DateComponent,
    CheckboxComponent
  ]
})
export class ChecklistModule { }
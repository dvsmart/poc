import { NgModule } from '@angular/core';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ListComponent } from './components/list/list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { ChecklistService } from './services/checklist.service';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistComponent } from './checklist.component';
import { MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatTabsModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { BreadcrumbsModule } from '@core/components/breadcrumb/breadcrumb.module';
import { TemplateComponent } from './components/Template/template.component';
import { TemplateFormComponent } from './components/templateForm/template-Form.component';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';
import { DynamicFormComponent } from '@core/components/custom-controls/components/custom-form/custom-form.component';
import { InputComponent } from '@core/components/custom-controls/components/textbox/textbox.component';
import { RadiobuttonComponent } from '@core/components/custom-controls/components/radio/radio.component';
import { TextAreaComponent } from '@core/components/custom-controls/components/textarea/textarea.component';
import { SelectComponent } from '@core/components/custom-controls/components/select/select.component';
import { DateComponent } from '@core/components/custom-controls/components/calender/calender.component';
import { CheckboxComponent } from '@core/components/custom-controls/components/checkbox/checkbox.component';

const routes: Routes = [
  {
    path: '',
    component: ChecklistComponent,
    redirectTo:'categories'
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    resolve:{
      categories: ChecklistService
    }
  },
  {
    path: 'cat/:id',
    component: TemplateListComponent,
  },
  {
    path: 'template/:id',
    component: TemplateComponent,
    data:{
      param:'/checklist/template/'
    },
    children:[
      {
        path:'edit/:id',
        component:TemplateFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    BreadcrumbsModule,
    MatTableModule,
    MatPaginatorModule,
    CustomControlsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ChecklistService,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  declarations: [ChecklistComponent, TemplateListComponent, CategoryListComponent, ListComponent, TemplateComponent,
  TemplateFormComponent],
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
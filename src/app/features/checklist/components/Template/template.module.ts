import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';
import { ListComponent } from './components/list/list.component';
import { TemplateService } from './checklistTemplate.service';
import { CustomMaterialModule } from '../../custom-material.module';
import { TemplateFormComponent } from './components/templateForm/template-Form.component';
import { CoreSharedModule } from '@core/core.module';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';
import { FormComponent } from './components/form/form.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: TemplateComponent
    }
];

@NgModule({
    imports: [
        CoreSharedModule,
        CustomControlsModule,
        CustomMaterialModule,
        RouterModule.forChild(routes),
    ],
    providers:[DatePipe],
    exports: [TemplateComponent],
    declarations: [TemplateComponent, ListComponent, TemplateFormComponent, FormComponent],
})
export class TemplateModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';
import { ListComponent } from './components/list/list.component';
import { CustomMaterialModule } from '../../custom-material.module';
import { CoreSharedModule } from '@core/core.module';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';
import { DatePipe } from '@angular/common';
import { EditFormComponent } from './components/editForm/edit-Form.component';

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
    declarations: [TemplateComponent, ListComponent, EditFormComponent],
})
export class TemplateModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';
import { ListComponent } from './components/list/list.component';
import { TemplateService } from './checklistTemplate.service';
import { CustomMaterialModule } from '../../custom-material.module';
import { TemplateFormComponent } from './components/templateForm/template-Form.component';
import { CoreSharedModule } from '@core/core.module';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';

const routes: Routes = [
    {
        path: '',
        component: TemplateComponent,
        resolve: {
            template: TemplateService
        },
        children: [
            {
                path: 'edit/:id',
                component: TemplateFormComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        CoreSharedModule,
        CustomControlsModule,
        CustomMaterialModule,
        RouterModule.forChild(routes),
    ],
    exports: [TemplateComponent],
    declarations: [TemplateComponent, ListComponent, TemplateFormComponent],
})
export class TemplateModule { }

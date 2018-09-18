import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CustomMaterialModule } from '../../custom-material.module';
import { CoreSharedModule } from '@core/core.module';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';
import { DatePipe } from '@angular/common';
import { EditFormComponent } from './components/editForm/edit-Form.component';
import { ListService } from './components/list/list.service';
import { EditFormService } from './components/editForm/editForm.service';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        resolve: {
            records: ListService
        }
    },
    {
        path: 'record/:id',
        component: EditFormComponent,
        resolve: {
            record: EditFormService
        }
    }
];

@NgModule({
    imports: [
        CoreSharedModule,
        CustomControlsModule,
        CustomMaterialModule,
        RouterModule.forChild(routes),
    ],
    providers: [DatePipe],
    declarations: [ListComponent, EditFormComponent],
})
export class TemplateModule { }

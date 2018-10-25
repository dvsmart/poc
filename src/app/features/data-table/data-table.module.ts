import { NgModule } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';
import { CoreSharedModule } from '@core/core.module';

@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        DataTableComponent
    ],
    exports: [
        DataTableComponent
    ],

})
export class DataTableModule {
}
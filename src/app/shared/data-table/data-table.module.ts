import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { DataTableComponent } from '../data-table/data-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@core/directives/directives';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FlexLayoutModule,
        FuseDirectivesModule
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
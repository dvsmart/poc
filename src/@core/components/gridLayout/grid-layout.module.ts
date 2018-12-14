import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@core/directives/directives';
import { MatIconModule, MatButtonModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { DataTableComponent } from '../data-table/data-table.component';
import { RouterModule } from '@angular/router';
import { TextCellComponent } from '../data-table/table-cell/cell-types/text-cell.component';
import { DateCellComponent } from '../data-table/table-cell/cell-types/date-cell.component';
import { TableCellComponent } from '../data-table/table-cell/table-cell.component';
import { CellDirective } from '../data-table/table-cell/cell.directive';
import { CommonModule } from '@angular/common';
import { CellService } from '../data-table/table-cell/cell-types/cell.service';
import { checkboxCellComponent } from '../data-table/table-cell/cell-types/checkbox-cell.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        RouterModule
    ],
    declarations: [
        GridLayoutComponent, 
        DataTableComponent,
        TableCellComponent,
        CellDirective,
        TextCellComponent,
        DateCellComponent,
        checkboxCellComponent
    ],
    exports: [
        GridLayoutComponent, DataTableComponent
    ],
    entryComponents:[
        TextCellComponent,
        DateCellComponent,
        checkboxCellComponent
    ],
    providers:[
        CellService
    ]

})
export class GridLayoutModule {
}
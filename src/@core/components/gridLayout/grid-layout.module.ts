import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@core/directives/directives';
import { MatIconModule, MatButtonModule, MatRippleModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { DataTableComponent } from '../data-table/data-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        FlexLayoutModule,
        FuseDirectivesModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,
        RouterModule
    ],
    declarations: [
        GridLayoutComponent, DataTableComponent
    ],
    exports: [
        GridLayoutComponent, DataTableComponent
    ],

})
export class GridLayoutModule {
}
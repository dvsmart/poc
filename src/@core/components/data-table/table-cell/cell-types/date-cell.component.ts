import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from './cell.component';
import { Column } from '../../dataTableSource';

@Component({
    selector: 'mdt-date-cell',
    template: '{{ row[column.name] | date:dateFormat }}'
})
export class DateCellComponent implements CellComponent, OnInit {
    @Input() column: Column;
    @Input() row: object;

    dateFormat = 'short';

    ngOnInit() {
        if (this.column.options) {
            if (this.column.options.dateFormat) {
                this.dateFormat = this.column.options.dateFormat;
            }
        }
    }
}
import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';

@Component({
    selector: 'mdt-checkbox-cell',
    template: '<mat-checkbox [indeterminate]="row[column.name]"></mat-checkbox>'
})
export class checkboxCellComponent implements CellComponent {
    @Input() column: any;
    @Input() row: object;
}
import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';

@Component({
    selector: 'mdt-text-cell',
    template: '{{ row[column.name] }}'
})
export class TextCellComponent implements CellComponent {
    @Input() column: any;
    @Input() row: object;
}
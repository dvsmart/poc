import { Type } from '@angular/core';
import { TextCellComponent } from './text-cell.component';
import { DateCellComponent } from './date-cell.component';
import { checkboxCellComponent } from './checkbox-cell.component';

export class CellService {

    private registeredCells: { [key: string]: Type<any>; } = {
        'string': TextCellComponent,
        'date': DateCellComponent,
        'bool': checkboxCellComponent
    };

    registerCell(type: string, component: Type<any>) {
        this.registeredCells[type] = component;
    }

    getCell(type: string): Type<any> {
        const component = this.registeredCells[type];

        if (component == null) {
            return TextCellComponent;
        }

        return component;
    }
}
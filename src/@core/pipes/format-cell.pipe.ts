import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({ name: 'formatCell' })
export class FormatCellPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,private datePipe: DatePipe
  ) { }
  transform(value: any, format: string) {
    if (value === undefined) {
      return 'not available';
    }
    if (format === 'default') {
      if (Array.isArray(value)) {
        if (typeof value[0] !== 'object') {
          return value.join(', ');
        } else {
          return value.map(obj => {
            return obj.name
          }).join(', ');
        }
      }
      if (typeof value === "object") {
        return value;
      }
    }

    if (format === 'currency') {
      return this.currencyPipe.transform(value, 'GBP', 'symbol');
    }

    if (format === 'date') {
      return this.datePipe.transform(value, 'dd-MMM-yyyy');
    }

    return value;

  }
}

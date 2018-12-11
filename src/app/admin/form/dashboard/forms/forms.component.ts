import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsService } from './forms.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  forms: any;
  categoryName: string;
  constructor(private formsService: FormsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.formsService.forms
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          if (response.name == undefined) {
            this.forms = response.Results;
            this.categoryName = "Uncategorised forms";
          } else {
            this.categoryName = response.name;
            this.forms = response.forms;
          }

        }
      });
  }

}

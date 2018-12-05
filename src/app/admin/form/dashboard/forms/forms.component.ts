import { Component, OnInit } from '@angular/core';
import { FormsService } from './forms.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  forms: any;
  constructor(private formsService: FormsService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.formsService.forms
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.forms = response;
        }
      });
  }

}

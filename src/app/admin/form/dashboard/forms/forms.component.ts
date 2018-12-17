import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormsService } from './forms.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { FormRequestModel } from '../form/FormRequestModel';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  forms: any = null;
  categoryName: string;
  categoryId: number;
  constructor(private formsService: FormsService, private route: ActivatedRoute, private _dialog: MatDialog,
    private toaster: MatSnackBar) {
    this._unsubscribeAll = new Subject();
    this.forms = null;
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.categoryId = x.id;
      this.categoryName = x.slug;
    })
    this.formsService.forms
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response && response.results && response.results.length > 0) {
          this.forms = response.results;
        }else{
          this.forms = null;
        }
      });
  }

  addNewForm(): void {
    const dialogRef = this._dialog.open(FormComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        let formRequest = new FormRequestModel(result, this.categoryId);
        this.formsService.saveForm(formRequest).then(() => {
          this.toaster.open("Form created Successfully.", null, { duration: 4000, verticalPosition: 'top', horizontalPosition: 'center' });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

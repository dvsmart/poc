import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TemplateRequest } from '../template.model';

@Component({
  selector: 'template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  template: TemplateRequest;

  private _unsubscribeAll: Subject<any>;
  constructor(private _formBuilder: FormBuilder, private router: Router) {
    this.formErrors = {
      company: {},
      firstName: {},
      lastName: {},
      address: {},
      address2: {},
      city: {},
      state: {},
      postalCode: {},
      country: {}
    };
    this._unsubscribeAll = new Subject();
    this.form = new FormGroup({});
  }

  ngOnInit() {
    
  }

  createTemplateForm() {
    
  }

  saveTemplate() {
    if (this.form.invalid) {
      return;
    }
  }

  cancelTemplate() {
    this.router.navigate(['admin/setup/customObject/templates']);
  }

  onFormValuesChanged(): void {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TemplateSetupService } from '../../template-setup/templatesetup.service';

@Component({
  selector: 'template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  template: any;

  private _unsubscribeAll: Subject<any>;
  constructor(private _formBuilder: FormBuilder, private router: Router, private templatesetupservice: TemplateSetupService) {
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
    this.templatesetupservice.onSelectedTemplateChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([res, formType]) => {
        if (formType === 'edit') {
          this.template = res;
        }
        this.form = this.createTemplateForm();
      })

    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onFormValuesChanged();
      });
  }

  createTemplateForm() {
    if (this.template) {
      return this._formBuilder.group({
        templateName: [this.template.templateName, [Validators.required, Validators.maxLength(25)]],
      });
    } else {
      return this._formBuilder.group({
        templateName: ['', [Validators.required, Validators.maxLength(25)]],
      });
    }
  }

  saveTemplate() {
    if (this.form.invalid) {
      return;
    }
    this.templatesetupservice.saveTemplate(this.form.getRawValue());
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

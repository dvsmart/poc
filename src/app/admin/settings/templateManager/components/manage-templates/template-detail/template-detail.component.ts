import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TemplateRequest, TemplateDetail } from '../template.model';
import { SetupService } from '../setup/setup.service';
import { TemplateDetailService } from './templateDetail.service';


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
  constructor(private _formBuilder: FormBuilder, private router: Router,private templateservies: SetupService) {
    this._unsubscribeAll = new Subject();
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.templateservies.onSelectedTemplateChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(([template,formType])=>{
      if(template && formType == 'edit'){
        this.template = new TemplateRequest(template);
      }else if(formType == 'new'){
        this.template = new TemplateRequest();
      }
      this.form = this.createTemplateForm();
    })
  }

  createTemplateForm() {
    return this._formBuilder.group({
      templateName: [this.template.templateName,Validators.required],
      pluralName:[this.template.pluralName],
      id:[this.template.id],
      categoryId: [this.template.categoryId],
      isVisible:[this.template.isVisible]
    });
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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Assessment } from '../models/assessment.model';
import { ReferenceModel } from '../models/reference.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { AssessmentService } from './assessment.service';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
  animations: fuseAnimations
})
export class AssessmentFormComponent implements OnInit {
  assessment: Assessment;
  pageType: string;
  assessmentForm: FormGroup;

  scopes: ReferenceModel[];
  types: ReferenceModel[];
  frequencies: ReferenceModel[];

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _assessmentservice: AssessmentService,
    private _location: Location
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._assessmentservice.onAssessmentChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(property => {
        if (property) {
          this.assessment = new Assessment(property);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.assessment = new Assessment();
        }
        this.assessmentForm = this.createAssessmentForm();
      });
  }

  createAssessmentForm(): FormGroup {
    this.getFrequencies();
    this.getScopes();
    this.getTypes();
    return this._formBuilder.group({
      title: [this.assessment.title],
      reference: [this.assessment.reference],
      assessmentTypeId: [this.assessment.assessmentTypeId],
      frequencyId: [this.assessment.frequencyId],
      publishedBy: [this.assessment.publishedBy],
      scope: [this.assessment.scope],
      scopeId: [this.assessment.scopeId],
      status: [this.assessment.status],
      assessmentDate: [this.assessment.assessmentDate],
      dataId:[this.assessment.dataId],
      id: [this.assessment.id]
    });
  }

  saveAssessment(): void {
    const data = this.assessmentForm.getRawValue();
    this._assessmentservice.updateAssessment(data)
      .then(x => {
        if (x['saveSuccessful'] === true) {
          data.id = parseInt(x['recordId']);
          data.assetId =   parseInt(x['savedEntityId']);
          data.dataId = x["savedDataId"];
        }
        this._assessmentservice.onAssessmentChanged.next(data);
        this._matSnackBar.open('assessment saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._location.go('/assessment/' + data.id);
      });
  }

  getScopes() {
    this._assessmentservice.getscopes().subscribe(x => this.scopes = x);
  }

  getTypes() {
    this._assessmentservice.getTypes().subscribe(x => this.types = x);
  }

  getFrequencies() {
    this._assessmentservice.getFrequencies().subscribe(x => this.frequencies = x);
  }

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.value === f2.value;
  }

  addAssessment(): void {
    const data = this.assessmentForm.getRawValue();
    this._assessmentservice.addAssessment(data)
      .then(x => {
        if (x['saveSuccessful'] === true) {
          data.id = parseInt(x['recordId']);
          data.assetId =   parseInt(x['savedEntityId']);
          data.dataId = x["savedDataId"];
        }
        this._assessmentservice.onAssessmentChanged.next(data);
        this._matSnackBar.open('assessment added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._location.go('/assessment/' + data.id);
      });
  }
}

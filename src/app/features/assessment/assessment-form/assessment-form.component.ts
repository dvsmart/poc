import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssessmentService } from '../assessment.service';
import { Assessment } from '../models/assessment.model';
import { ReferenceModel } from '../models/reference.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
  animations: fuseAnimations
})
export class AssessmentFormComponent implements OnInit {
  formGroup: FormGroup;
  title: string;
  scopes: ReferenceModel[];
  types: ReferenceModel[];
  frequencies: ReferenceModel[];
  assessment: Assessment;
  @Output() closeForm: EventEmitter<boolean>;

  constructor(private assessmentservice: AssessmentService, private route: ActivatedRoute, private _location: Location) {
    this.route.params.subscribe(x => { 
      if(x != null){
        const id = parseInt(x["id"]);
        this.assessmentservice.getSingle(id)
        .subscribe(assessment => {
          this.editFormGroup(assessment);
      });
      }
    });
  }


  ngOnInit() {
    this.createFormGroup();
    this.getTypes();
    this.getFrequencies();
    this.getScopes();
  }

  getAssessment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.assessmentservice.getSingle(id)
      .subscribe(assessment => {
        this.editFormGroup(assessment);
      });
  }

  getScopes() {
    this.assessmentservice.getscopes().subscribe(x => this.scopes = x);
  }

  getTypes() {
    this.assessmentservice.getTypes().subscribe(x => this.types = x);
  }

  getFrequencies() {
    this.assessmentservice.getFrequencies().subscribe(x => this.frequencies = x);
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      reference: new FormControl('', Validators.required),
      assessmentTypeId: new FormControl('', Validators.required),
      scope: new FormControl(''),
      scopeId: new FormControl(''),
      status: new FormControl(''),
      assessmentDate: new FormControl(''),
      id: new FormControl(0),
      publishedBy: new FormControl(''),
      frequencyId: new FormControl(''),
      dataId: new FormControl(0)
    });

  }

  editFormGroup(data: Assessment) {
    if (data != null && data != undefined) {
      this.title = 'Edit Assessment - ' + data.dataId;
      this.formGroup.patchValue({
        id: data.id,
        dataId: data.dataId,
        title: data.title,
        reference: data.reference,
        assessmentTypeId: data.assessmentTypeId,
        scope: data.scope,
        assessmentDate: data.assessmentDate,
        publishedBy: data.publishedBy,
        scopeId: data.scopeId,
        frequencyId: data.frequencyId
      })
    } else {
      this.title = 'Create New Assessment';
    }
  }

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.value === f2.value;
  }

  save() {
    if (this.formGroup.value.id == "") {
      this.assessmentservice.add(this.formGroup.value).subscribe(x => {
        if (x['saveSuccessful'] === true) {
          this.title = 'Edit Property - ' + x['savedDataId'];
        }
      });
    } else {
      this.assessmentservice.update(this.formGroup.value.id, this.formGroup.value).subscribe(x => {
        if (x['saveSuccessful'] === true) {
          this.title = 'Edit Property - ' + x['savedDataId'];
        }
      });
    }
  }

  cancel() {
    this.closeForm.emit(true);
  }
}

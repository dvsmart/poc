import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@core/animations';
import { PropertyService } from './property.service';
import { CreateAssetPropertyRequest } from '../models/createPropertyRequestModel';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties-form',
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PropertiesFormComponent implements OnInit {
  property: CreateAssetPropertyRequest;
  pageType: string;
  propertyForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _propertyservice: PropertyService,
    private _location: Router
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._propertyservice.onPropertyChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(property => {
        if (property) {
          this.property = new CreateAssetPropertyRequest(property);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.property = new CreateAssetPropertyRequest();
        }
        this.propertyForm = this.createPropertyForm();
      });
  }

  createPropertyForm(): FormGroup {
    return this._formBuilder.group({
      propertyReference: [this.property.propertyReference],
      addressLine1: [this.property.addressLine1],
      addressLine2: [this.property.addressLine2],
      addressLine3: [this.property.addressLine3],
      city: [this.property.city],
      postcode: [this.property.postcode],
      knownAs: [this.property.knownAs],
      propertySize: [this.property.propertySize],
      netInternalSize: [this.property.netInternalSize],
      grossInternalSize: [this.property.grossInternalSize],
      numberOfFloors: [this.property.numberOfFloors],
      numberOfPlantRooms: [this.property.numberOfPlantRooms],
      statusStartDate: [this.property.statusStartDate],
      id: [this.property.id],
      assetId: [this.property.assetId],
    });
  }

  saveProperty(): void {
    const data = this.propertyForm.value;
    this._propertyservice.updateProperty(data)
      .then(x => {
        this._location.navigate(['/asset/properties/' + x.id]);
      });
  }

  addProperty(): void {
    const data = this.propertyForm.value;
    this._propertyservice.addProperty(data)
      .then(x => {
        this._location.navigate(['/asset/properties/' + x.id]);
      });
  }
}

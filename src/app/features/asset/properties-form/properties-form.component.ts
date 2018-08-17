import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-properties-form',
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss']
})
export class PropertiesFormComponent implements OnInit {
  formGroup: FormGroup;
  title:string;
  constructor(private _propertyservice: PropertiesService, private route: ActivatedRoute,private router: Router) {
    this.route.params.subscribe(x => {
      if (x != null) {
        const id = parseInt(x["id"]);
        this._propertyservice.getSingle(id)
          .subscribe(property => {
            this.editFormGroup(property);
          });
      }
    });
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      PropertyReference: new FormControl('', Validators.required),
      AddressLine1: new FormControl('', Validators.required),
      AddressLine2: new FormControl('', Validators.required),
      AddressLine3: new FormControl(''),
      City: new FormControl(''),
      Postcode: new FormControl(''),
      KnownAs: new FormControl(''),
      PropertySize: new FormControl(''),
      NetInternalSize: new FormControl(''),
      GrossInternalSize: new FormControl(''),
      NumberOfFloors: new FormControl(''),
      NumberOfPlantRooms: new FormControl(''),
      StatusStartDate: new FormControl(''),
      id: new FormControl(0),
      assetId: new FormControl(0)
    });
  }

  editFormGroup(property) {
    if (property != null && property != undefined) {
      this.title = 'Edit Property - ' + property.dataId;
      this.formGroup.patchValue({
        id: property.id,
        dataId: property.dataId,
        AddressLine1: property.addressLine1,
        PropertyReference: property.propertyReference,
        AddressLine2: property.addressLine2,
        AddressLine3: property.addressLine3,
        City: property.city,
        Postcode: property.postcode,
        KnownAs: property.knownAs,
        PropertySize: property.propertySize,
        NetInternalSize: property.netInternalSize,
        GrossInternalSize: property.grossInternalSize,
        NumberOfFloors: property.numberOfFloors,
        NumberOfPlantRooms: property.numberOfPlantRooms,
        StatusStartDate: property.statusStartDate,
        assetId: property.assetId
      })
    } else {
      this.title = 'Create New Property';
    }
  }

  cancel(){
    this.router.navigate(['asset/properties']);
  }
}

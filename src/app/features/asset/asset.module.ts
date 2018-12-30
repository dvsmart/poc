import { NgModule } from '@angular/core';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { PropertiesService } from './properties-list/properties.service';
import { PropertyService } from './properties-form/property.service';
import { UploadModule } from '@core/components/upload/upload.module';


const propertyRoutes: Routes = [
  {
    path: 'properties',
    component: PropertiesListComponent,
    resolve: {
      properties: PropertiesService
    }
  },
  {
    path: 'properties/:id',
    component: PropertiesFormComponent,
    resolve: {
      property: PropertyService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    UploadModule,
    RouterModule.forChild(propertyRoutes)
  ],
  providers: [PropertiesService, PropertyService],
  declarations: [PropertiesListComponent, PropertiesFormComponent],
})
export class AssetModule { }

import { NgModule } from '@angular/core';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatNativeDateModule, MatTabsModule, MatSortModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { PropertiesService } from './properties-list/properties.service';
import { PropertyService } from './properties-form/property.service';

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
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(propertyRoutes)
  ],
  providers: [PropertiesService, PropertyService],
  declarations: [PropertiesListComponent, PropertiesFormComponent],
})
export class AssetModule { }

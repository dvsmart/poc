import { NgModule } from '@angular/core';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatSelectModule, MatNativeDateModule, MatTabsModule, MatSortModule, MatChipsModule, MatSnackBarModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { FuseSidebarModule } from '@core/components/sidebar/sidebar.module';
import { PropertiesService } from './properties-list/properties.service';
import { PropertyService } from './properties-form/property.service';

// const routes: Routes = [
//   {
//     path: '',
//     component: AssetComponent,
//     children:[
//       {
//         path: 'edit/:id',
//         component: PropertiesFormComponent,
//       },
//       {
//         path: 'new',
//         component: PropertiesFormComponent,
//       }
//     ],
//     resolve:{
//       properties: PropertiesService
//     },
//   }
// ];

const propertyRoutes: Routes = [
  {
    path: 'properties',
    component: PropertiesListComponent,
    resolve: {
      properties: PropertiesService
    }
  },
  {
    path: 'property/:id',
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
    RouterModule.forChild(propertyRoutes)
  ],
  providers: [PropertiesService, PropertyService],
  declarations: [PropertiesListComponent, PropertiesFormComponent],
})
export class AssetModule { }

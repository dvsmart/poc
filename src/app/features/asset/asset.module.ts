import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesService } from './properties.service';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatSelectModule, MatNativeDateModule, MatTabsModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { FuseSidebarModule } from '@core/components/sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
    children:[
      {
        path: 'edit/:id',
        component: PropertiesFormComponent,
      },
      {
        path: 'new',
        component: PropertiesFormComponent,
      }
    ],
    resolve:{
      properties: PropertiesService
    },
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  providers:[PropertiesService],
  declarations: [AssetComponent, PropertiesListComponent, PropertiesFormComponent, SelectedBarComponent, SidebarComponent],
})
export class AssetModule { }

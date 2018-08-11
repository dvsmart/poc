import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesService } from './properties.service';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { FuseSidebarModule } from '@core/components/sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '**',
    component: AssetComponent,
    resolve:{
      properties: PropertiesService
    }
  }
];


@NgModule({
  imports: [
    CommonModule,
    CoreSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,

    RouterModule.forChild(routes),

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
    MatPaginatorModule
  ],
  providers:[PropertiesService],
  declarations: [AssetComponent, PropertiesListComponent, PropertiesFormComponent, SelectedBarComponent, SidebarComponent],
  entryComponents:[PropertiesFormComponent]
})
export class AssetModule { }

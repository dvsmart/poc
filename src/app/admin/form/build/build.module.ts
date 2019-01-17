import { NgModule } from '@angular/core';
import { BuildComponent } from './build.component';
import { FieldTypesComponent } from './field-types/field-types.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { FieldSpecComponent } from './field-spec/field-spec.component';
import { Routes, RouterModule } from '@angular/router';
import { FieldsComponent } from './fields/fields.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatExpansionModule, MatIconModule, MatDatepickerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: BuildComponent,
    children:[
      {
        path:'layout',
        component:FormLayoutComponent
      }
    ]
  }
]


@NgModule({
  declarations: [BuildComponent, FieldTypesComponent, FormLayoutComponent, FieldSpecComponent, FieldsComponent],
  imports: [
    DragDropModule,
    CommonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class BuildModule { }

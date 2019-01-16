import { NgModule } from '@angular/core';
import { BuildComponent } from './build.component';
import { FieldTypesComponent } from './field-types/field-types.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { FieldSpecComponent } from './field-spec/field-spec.component';
import { Routes, RouterModule } from '@angular/router';
import { FieldsComponent } from './fields/fields.component';

const routes: Routes = [
  {
    path: '',
    component: BuildComponent,
    children:[
      
    ]
  }
]


@NgModule({
  declarations: [BuildComponent, FieldTypesComponent, FormLayoutComponent, FieldSpecComponent, FieldsComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class BuildModule { }

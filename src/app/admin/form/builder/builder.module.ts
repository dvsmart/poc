import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { BuilderComponent } from './builder.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldsService } from './fields/fields.service';

const routes: Routes = [
  {
    path: ':id',
    component:BuilderComponent,
    children:[
      {
        path:'fields',
        component:FieldsComponent,
        resolve:{
          fields: FieldsService
        }
      },
      {
        path:'**',
        redirectTo:'fields'
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuilderComponent, FieldsComponent]
})
export class BuilderModule { }

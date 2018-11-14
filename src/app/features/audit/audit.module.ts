import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FormsService } from './forms/forms.service';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    resolve:{
      forms: FormsService
    }
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormsComponent, FormComponent]
})
export class AuditModule { }

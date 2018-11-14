import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreSharedModule } from '@core/core.module';
import { FormsService } from './forms/forms.service';
import { FormListComponent } from './form-list/form-list.component';
import { FormListService } from './form-list/form-list.service';
import { FormService } from './form/form.service';
import { CustomControlsModule } from '@core/components/custom-controls/custom-controls.module';

const routes: Routes = [
  {
    path: 'forms',
    component: FormsComponent,
    resolve: {
      forms: FormsService
    }
  },
  {
    path: 'forms/:id',
    component: FormListComponent,
    resolve: {
      formList: FormListService
    }
  },
  {
    path: 'forms/3/edit/:id',
    component: FormComponent,
    resolve: {
      list: FormService
    }
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    CustomControlsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormsComponent, FormComponent, FormListComponent]
})
export class AuditModule { }

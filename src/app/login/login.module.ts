import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '../../../node_modules/@angular/material';
import { CoreSharedModule } from '@core/core.module';

const routes: Routes = [
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    CoreSharedModule
  ],
  declarations: [LoginComponent],
  exports:[LoginComponent]
})
export class LoginModule { }

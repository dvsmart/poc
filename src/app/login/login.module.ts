import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '../../../node_modules/@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login'
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    CoreSharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }

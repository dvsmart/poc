import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '../../../node_modules/@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { UserIdleModule } from './timeout/idle.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    CoreSharedModule,
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120}),
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }

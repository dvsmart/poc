import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '../../../node_modules/@angular/material';
import { UserIdleModule } from './timeout/idle.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@core/directives/directives';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FlexLayoutModule,
    FuseDirectivesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }

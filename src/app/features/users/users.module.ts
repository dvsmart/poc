import { NgModule } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserService } from './components/users/user.service';
import { UserDetailService } from './components/user-detail/user-detail.service';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      data: UserService
    }
  },
  {
    path: 'edit/:id',
    component: UserDetailComponent,
    resolve: {
      data: UserDetailService
    }
  },
  {
    path: 'users/:id/:username',
    component: UserDetailComponent,
    resolve: {
      data: UserDetailService
    }
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent, UserDetailComponent],
  providers:[
    UserService,
    UserDetailService
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserService } from './components/users/user.service';
import { UserDetailService } from './components/user-detail/user-detail.service';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';

const userRoutes: Routes = [
  {
    path: 'users', 
    component: UsersComponent,
    resolve: {
      users: UserService
    }
  },
  {
    path: 'user/:id', 
    component: UserDetailComponent,
    resolve: {
      user: UserDetailService
    }
  }
];

@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [UsersComponent, UserDetailComponent],
  providers: [
    UserService,
    UserDetailService
  ]
})
export class UsersModule { }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UserDetailService } from './user-detail.service';
import { User } from '../../model/user.model';
import { takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@core/utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserDetailComponent implements OnInit {
  user: User;
  pageType: string;
  userForm: FormGroup;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _userDetailservice: UserDetailService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._userDetailservice.onUserChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        if (user) {
          this.user = new User(user);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.user = new User();
        }
        this.userForm = this.createUserForm();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createUserForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.user.id],
      username: [this.user.username],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
      active: [this.user.active],
      address:[this.user.address],
      emailAddress:[this.user.emailAddress]
    });
  }

  saveUser(): void {
    const data = this.userForm.getRawValue();
    data.username = FuseUtils.handleize(data.name);

    this._userDetailservice.saveUser(data)
      .then(() => {
        // Trigger the subscription with new data
        this._userDetailservice.onUserChanged.next(data);
        // Show the success message
        this._matSnackBar.open('User saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  /**
   * Add product
   */
  addUser(): void {
    const data = this.userForm.getRawValue();
    data.username = FuseUtils.handleize(data.name);

    this._userDetailservice.addUser(data)
      .then(() => {

        // Trigger the subscription with new data
        this._userDetailservice.onUserChanged.next(data);

        // Show the success message
        this._matSnackBar.open('User added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._location.go('users/' + this.user.id + '/' + this.user.username);
      });
  }
}

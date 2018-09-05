import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { PagedResult } from '../../../checklist/models/custom.model';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersResult: PagedResult;
  onUsersChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.onUsersChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getUsers(1, 10)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getUsers(page, pageSize): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<PagedResult>(environment.apiUrl + 'User?page=' + page + '&pageSize=' + pageSize)
        .subscribe((response: PagedResult) => {
          this.usersResult = response;
          this.onUsersChanged.next(this.usersResult);
          resolve(response);
        }, reject);
    });
  }
}

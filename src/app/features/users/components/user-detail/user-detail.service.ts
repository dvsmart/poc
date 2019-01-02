import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  routeParams: any;
  user: any;
  onUserChanged: BehaviorSubject<any>;
  constructor(
    private _httpClient: HttpClient
  ) {
    this.onUserChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getUser()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onUserChanged.next('');
      }
      else {
        this._httpClient.get(environment.apiUrl + 'Users/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.user = response;
            this.onUserChanged.next(this.user);
            resolve(response);
          }, reject);
      }
    });
  }


  saveUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Users' + user.id, user)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  addUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Users' , user)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

}

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
    debugger;
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onUserChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get(environment.apiUrl + 'User/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.user = response;
            this.onUserChanged.next(this.user);
            resolve(response);
          }, reject);
      }
    });
  }


  saveUser(product): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'User' + product.id, product)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  addUser(product): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'User' , product)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

}

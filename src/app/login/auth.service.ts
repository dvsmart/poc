import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(this.hasLoggedIn());
  api = environment.apiUrl + 'Membership/Authenticate'
  constructor(private http: HttpClient) {
  }


  authenticate(loginForm: any) {
    return this.http.post<any>(this.api, loginForm)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          localStorage.setItem('currentUser', user.username);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('token', user.token);
          this.isAuthenticated.next(true);
        }

        return user;
      }));
  }

  private hasLoggedIn() {
    return !!sessionStorage.getItem('token');
  }
  
  public get authenticated(): boolean {
    return this.isAuthenticated.value;
  }


  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.isAuthenticated.next(null);
  }
}

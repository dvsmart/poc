import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isLoggedIn = new BehaviorSubject<boolean>(this.hasLoggedIn());
  api = environment.apiUrl + 'User/authenticate'
  constructor(private http: HttpClient) {

  }

  login(loginform: any) {
    return this.http.post<any>(this.api, loginform).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        const time_to_login = new Date().getHours() + new Date().setHours(6);
        console.log(time_to_login);
        localStorage.setItem('timer', JSON.stringify(time_to_login));
        this._isLoggedIn.next(true);
      }
    }));
  }

  private hasLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  isLoginSuccessful() {
    return this._isLoggedIn.asObservable();
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
  }
  
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  _isLoggedIn = new BehaviorSubject<boolean>(this.hasLoggedIn());
  api = environment.apiUrl + 'Membership/Authenticate'
  constructor(private http: HttpClient) {
    
  }

  login(loginform: any) {
    return this.http.post<any>(this.api, loginform).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('token', user.token);
        this._isLoggedIn.next(true);
      }
    }));
  }

  private hasLoggedIn() {
    var userInfo = JSON.parse(localStorage.getItem('currentUser'));
    return !!userInfo;
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

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isLoggedIn = new BehaviorSubject<boolean>(this.hasLoggedIn());

  constructor(private http: HttpClient) {

   }

  login(loginform: any) {
      if((loginform.email === 'vj' || loginform.email === 'vj@gmail.com') && loginform.password === 'pass'){
        localStorage.setItem('user',loginform.email);
        this._isLoggedIn.next(true);
      }
      else{
        this._isLoggedIn.next(false);
      }
  }

  private hasLoggedIn(){
    return !!localStorage.getItem('user');
  }

  isLoginSuccessful(){
    return this._isLoggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('user');
    this._isLoggedIn.next(false);
  }

  ngOnDestroy(){
    this._isLoggedIn.unsubscribe();
  }
}

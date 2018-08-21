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
      return this.http.post<any>(this.api,loginform).pipe(map(user=>{
        if(user && user.token){
          debugger;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._isLoggedIn.next(true);
        }else{
          this._isLoggedIn.next(false);
        }
      }));
  }

  private hasLoggedIn(){
    return !!localStorage.getItem('currentUser');
  }

  isLoginSuccessful(){
    return this._isLoggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
  }

  ngOnDestroy(){
    this._isLoggedIn.unsubscribe();
  }
}

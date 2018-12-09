import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  form: BehaviorSubject<any>;
  formId:any;
  constructor(private _httpClient: HttpClient) { }

  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.formId = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getFields()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getFields(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Form/Fields/' + this.formId)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}

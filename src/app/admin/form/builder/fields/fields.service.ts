import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  routeParams: any;
  fields: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.fields = new BehaviorSubject<any>(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
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
      this._httpClient.get<any>(environment.apiUrl + 'FormFields/1')
        .subscribe((response: any) => {
          this.fields.next(response);
          resolve(response);
        }, reject);
    });
  }
}

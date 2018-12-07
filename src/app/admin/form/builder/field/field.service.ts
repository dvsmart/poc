import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  routeParams: any;
  fields: BehaviorSubject<any>;
  fieldTypes: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.fields = new BehaviorSubject<any>(null);
    this.fieldTypes = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getFieldTypes()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getField(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Form/Fields/' + this.routeParams.id)
        .subscribe((response: any) => {
          this.fields.next(response);
          resolve(response);
        }, reject);
    });
  }

  getFieldTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Form/FieldTypes')
        .subscribe((response: any) => {
          this.fieldTypes.next(response);
          resolve(response);
        }, reject);
    });
  }
}

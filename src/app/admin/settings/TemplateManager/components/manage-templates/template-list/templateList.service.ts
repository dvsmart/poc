import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class  TemplatesService{
  routeParams: any;
  formTemplates: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.formTemplates = new BehaviorSubject<any>(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAllTemplates()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getAllTemplates(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'FormTemplate/Templates')
        .subscribe((response: any) => {
          this.formTemplates.next(response);
          resolve(response);
        }, reject);
    });
  }
}

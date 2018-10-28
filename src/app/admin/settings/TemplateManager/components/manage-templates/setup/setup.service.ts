import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  onSelectedTemplateChanged: BehaviorSubject<any>;
  routeParams: any;

  fields: any;

  constructor(private _httpClient: HttpClient) {
    this.onSelectedTemplateChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTemplateDetail()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getTemplateDetail() {
    debugger;
    if (this.routeParams.id != 'new') {
      return new Promise((resolve, reject) => {
        this._httpClient.get<any>(environment.apiUrl + 'CustomTemplateConfig/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.onSelectedTemplateChanged.next([response, 'edit']);
            resolve(response);
          }, reject);
      });
    }
  }

  saveTemplate(templateName) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'CustomTemplateConfig', { ...templateName })
        .subscribe((response: any) => {
          this.onSelectedTemplateChanged.next([response, 'edit']);
          resolve(response);
        }, reject);
    });
  }

  updateTemplate(templateName) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(environment.apiUrl + 'CustomTemplateConfig', { ...templateName })
        .subscribe((response: any) => {
          this.onSelectedTemplateChanged.next([response, 'edit']);
          resolve(response);
        }, reject);
    });
  }


}
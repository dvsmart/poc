import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TemplateResponse } from '../../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateSetupService {
  onSelectedTemplateChanged: BehaviorSubject<any>;


  routeParams: any;
  customTabs: BehaviorSubject<any>;
  ontemplateChanged:BehaviorSubject<string>;
  ontemplateIdChanged:BehaviorSubject<number>;

  constructor(private _httpClient: HttpClient) {
    this.customTabs = new BehaviorSubject<any>(null);
    this.ontemplateChanged = new BehaviorSubject<string>('');
    this.ontemplateIdChanged = new BehaviorSubject<number>(0);

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

  getCustomTabs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'CustomTabConfig/' + this.routeParams.id)
        .subscribe((response: any) => {
          this.ontemplateChanged.next(response.templateName);
          this.ontemplateIdChanged.next(response.id);
          this.customTabs.next(response.templateTabs);
          resolve(response);
        }, reject);
    });
  }

  getTemplateDetail(){
    return new Promise((resolve, reject) => {
      this._httpClient.get<TemplateResponse>(environment.apiUrl + 'CustomTemplateConfig/' + this.routeParams.id)
        .subscribe((response: TemplateResponse) => {
          this.onSelectedTemplateChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
}
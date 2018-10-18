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
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  onCategoriesChanged: BehaviorSubject<any>;
  onFormsChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.onCategoriesChanged = new BehaviorSubject({});
    this.onFormsChanged = new BehaviorSubject({});
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getCategories(),
        this.getForms()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.apiUrl + 'CustomCategoryConfig')
        .subscribe((response: any) => {
          this.onCategoriesChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

  /**
   * Get courses
   *
   * @returns {Promise<any>}
   */
  getForms(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.apiUrl + 'CustomTemplateConfig')
        .subscribe((response: any) => {
          this.onFormsChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

}

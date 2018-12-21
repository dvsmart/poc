import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  formId: any;
  tabs: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.tabs = new BehaviorSubject<any>(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.formId = route.parent.params["id"];
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTabs()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  async getTabs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'FormTabs/' + this.formId)
        .subscribe((response: any) => {
          this.tabs.next(response);
          resolve(response);
        }, reject);
    });
  }

  async deleteTab(tabId: string | number):Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(environment.apiUrl + 'FormTabs?id=' + tabId)
        .subscribe((response: any) => {
          this.getTabs();
          resolve(response);
        }, reject);
    });
  }
}

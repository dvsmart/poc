import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TabResponse } from './tab.model';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  onCurrentTabChanged: BehaviorSubject<any>;

  routeParams: any;
  customTabs: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.customTabs = new BehaviorSubject<any>(null);
    this.onCurrentTabChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCustomTabs()
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
          this.customTabs.next(response);
          resolve(response);
        }, reject);
    });
  }

  setCurrentTab(tab): void {
    this.onCurrentTabChanged.next([tab, 'edit']);
  }

  addTab(tabRequest) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'CustomTabConfig', { ...tabRequest })
        .subscribe((response: TabResponse) => {
          resolve(response);
        }, reject);
    });
  }
}
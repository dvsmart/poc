import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Tab } from './tab.model';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  updateTask(data: any): any {
    throw new Error("Method not implemented.");
  }
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
}
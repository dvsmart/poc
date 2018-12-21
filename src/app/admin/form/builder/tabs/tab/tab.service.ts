import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TabRequest } from './tab';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  onTabChanged: BehaviorSubject<any>;
  tabId: any;

  constructor(private _httpClient: HttpClient) {
    this.onTabChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.tabId = route.params["id"];
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTab()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  async getTab(): Promise<any> {
    if (this.tabId != 'new') {
      return new Promise((resolve, reject) => {
        this._httpClient.get<any>(environment.apiUrl + 'FormTabs?id=' + this.tabId)
          .subscribe((response: any) => {
            this.onTabChanged.next(response);
            resolve(response);
          }, reject);
      });
    } else {
      this.onTabChanged.next('');
    }
  }

  async addTab(tabRequestModel: TabRequest, type?:string) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'FormTabs', tabRequestModel)
        .subscribe((response: any) => {
          if(type === 'saveNew'){
            this.onTabChanged.next('');
          }else{
            this.onTabChanged.next(response);
          }
          resolve(response);
        }, reject);
    });
  }

  async updateTab(tabRequestModel: TabRequest) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(environment.apiUrl + 'FormTabs', tabRequestModel)
        .subscribe((response: any) => {
          this.onTabChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
}

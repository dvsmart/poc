import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TabResponse } from '../../models/template.model';
import { TemplateSetupService } from '../template-setup/templatesetup.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  onCurrentTabChanged: BehaviorSubject<any>;
  onNewTabClicked: Subject<any>;

  routeParams: any;
  customTabs: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient, private templateservice: TemplateSetupService) {
    this.customTabs = new BehaviorSubject<any>(null);
    this.onCurrentTabChanged = new BehaviorSubject<any>({});
    this.onNewTabClicked = new Subject();
  }

  getCustomTabs(templateId): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'CustomTabConfig/' + templateId)
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
          this.onCurrentTabChanged.next([response, 'edit']);
          this.templateservice.getTemplateDetail();
          resolve(response);
        }, reject);
    });
  }
}
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
  onCurrentTabChanged: BehaviorSubject<any>;
  routeParams: any;

  customTabs: BehaviorSubject<any>;
  customFields: BehaviorSubject<any>;
  templateId: BehaviorSubject<number>;

  constructor(private _httpClient: HttpClient) {
    this.onSelectedTemplateChanged = new BehaviorSubject<any>({});
    this.customTabs = new BehaviorSubject<any>({});
    this.customFields = new BehaviorSubject<any>({});
    this.onCurrentTabChanged = new BehaviorSubject<any>({});
    this.templateId = new BehaviorSubject(0);
  }

  get TemplateId() {
    return this.templateId.getValue();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      debugger;
      Promise.all([
        this.getTemplateDetail(),
        this.getCustomTabs()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getTemplateDetail() {
    if (this.routeParams.id != 'new') {
      return new Promise((resolve, reject) => {
        this._httpClient.get<any>(environment.apiUrl + 'FormTemplate/Template/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.templateId.next(response.id);
            this.onSelectedTemplateChanged.next([response, 'edit']);
            resolve(response);
          }, reject);
      });
    }
    this.onSelectedTemplateChanged.next([null, 'new']);
  }

  getCustomTabs(): Promise<any> {
    if (this.routeParams.id != 'new') {
      return new Promise((resolve, reject) => {
        var templateId = this.TemplateId == 0 ? this.routeParams.id : this.TemplateId;
        this._httpClient.get<any>(environment.apiUrl + 'FormTab/Tabs?templateId=' + templateId)
          .subscribe((response: any) => {
            this.customTabs.next(response);
            resolve(response);
          }, reject);
      });
    }
    this.customTabs.next(null);
  }

  getTemplateFields() {
    return new Promise((resolve, reject) => {
      var templateId = this.TemplateId == 0 ? this.routeParams.id : this.TemplateId;
      this._httpClient.get<any>(environment.apiUrl + 'CustomTemplateFieldConfig/' + templateId)
        .subscribe((response: any) => {
          this.customFields.next(response);
          resolve(response);
        }, reject);
    });
  }

  getTemplateTabFields() {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'CustomTabFieldConfig/' + 1)
        .subscribe((response: any) => {
          this.customFields.next(response);
          resolve(response);
        }, reject);
    });
  }

  setCurrentTab(tab?, formType?): void {
    this.onCurrentTabChanged.next([tab == undefined ? this.TemplateId : tab, formType == undefined ? 'new' : formType]);
  }

  set setSelectedTemplate(template) {
    this.onSelectedTemplateChanged.next([template, 'edit']);
  }

  saveTemplate(templateName) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'CustomTemplateConfig', { ...templateName })
        .subscribe((response: any) => {
          this.setSelectedTemplate(response);
          resolve(response);
        }, reject);
    });
  }

  updateTemplate(templateName) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(environment.apiUrl + 'CustomTemplateConfig', { ...templateName })
        .subscribe((response: any) => {
          this.setSelectedTemplate(response);
          resolve(response);
        }, reject);
    });
  }


}
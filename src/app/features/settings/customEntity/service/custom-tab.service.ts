import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CustomTabModel, CustomFieldModel, CreateCustomTabRequest, CustomTabResponse, TemplateTab } from '../models/customEntity.model';
import { SaveResponse } from '../../../checklist/components/Template/model/record.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomTabService {
    customTabs: BehaviorSubject<CustomTabResponse>;
    routeParams: any;
    customTabFields: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.customTabs = new BehaviorSubject<CustomTabResponse>(null);
        this.customTabFields = new BehaviorSubject<TemplateTab>(null);
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
            this.http.get<CustomTabResponse>(environment.apiUrl + 'Template/' + this.routeParams.id)
                .subscribe((response: CustomTabResponse) => {
                    this.customTabs.next(response);
                    resolve(response);
                }, reject);
        });
    }

    addTemplateTab(tab: CreateCustomTabRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post<SaveResponse>(environment.apiUrl + 'TemplateTab', tab)
                .subscribe((response: SaveResponse) => {
                    this.getCustomTabs();
                    resolve(response);
                }, reject);
        });
    }

    createTab(tabRequestModel: CustomTabModel) {
        return this.http.post<SaveResponse>(environment.apiUrl + 'TemplateTab', tabRequestModel);
    }

    createTabField(tabFieldRequestModel: CustomFieldModel) {
        return this.http.post<SaveResponse>(environment.apiUrl + 'TemplateFormControl', tabFieldRequestModel);
    }

    getTabFields(tabId): Promise<any> {
        debugger;
        return new Promise((resolve, reject) => {
          this.http.get<any>(environment.apiUrl + 'TemplateTab?id=' + tabId)
            .subscribe((response: TemplateTab) => {
              this.customTabFields.next(response);
              //this.tabFields.next(response.customFields);
              resolve(response);
            }, reject);
        });
      }
}


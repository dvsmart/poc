import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { FieldType, FieldResponse } from './field.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class FieldService {
    routeParams: any;

    onfieldsChanged: BehaviorSubject<any>;

    customTemplateId: BehaviorSubject<number>;
    tabId: BehaviorSubject<number>;
    fieldTypes: BehaviorSubject<FieldType[]>;

    onNewFieldAdded: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.customTemplateId = new BehaviorSubject(0);
        this.tabId = new BehaviorSubject(0);
        this.onNewFieldAdded = new BehaviorSubject<any>({});
        this.fieldTypes = new BehaviorSubject<FieldType[]>(null);
        this.onfieldsChanged = new BehaviorSubject<any>({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTemplateFields()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getTemplateFields() {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'CustomFieldConfig/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.onfieldsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }


    setSelectedTab(tabId) {
        this.tabId.next(tabId);
    }

    setTemplateId(templateId) {
        this.customTemplateId.next(templateId);
    }

    addField(req) {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiUrl + 'CustomFieldConfig', { ...req })
                .subscribe((response: FieldResponse) => {
                    this.onNewFieldAdded.next(response);
                    //      this.templateservice.getTemplateDetail();
                    resolve(response);
                }, reject);
        });
    }

    getFieldTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<FieldType[]>(environment.apiUrl + 'CustomFieldTypeConfig')
                .subscribe((response: FieldType[]) => {
                    this.fieldTypes.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
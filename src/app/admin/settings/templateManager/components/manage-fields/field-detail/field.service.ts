import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { FieldType, FieldResponse, CreateTabFieldRequest } from '../field.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SetupService } from '../../manage-templates/setup.service';


@Injectable({
    providedIn: 'root'
})
export class FieldService {
    routeParams: any;

    onfieldsChanged: BehaviorSubject<any>;

    customTemplateId: BehaviorSubject<number>;
    fieldId: number;
    fieldTypes: BehaviorSubject<FieldType[]>;

    onNewFieldAdded: BehaviorSubject<any>;

    edit: boolean;

    constructor(private _httpClient: HttpClient, private templateservice: SetupService, private router: Router) {
        this.onNewFieldAdded = new BehaviorSubject<any>({});
        this.fieldTypes = new BehaviorSubject<FieldType[]>(null);
        this.onfieldsChanged = new BehaviorSubject<any>({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTabField(),
                this.getFieldTypes()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    setTabField(field?: any) {
        this.getFieldTypes();
        this.templateservice.getCustomTabs();
        field = field || {};
        var fieldreq = {
            templateId: this.templateservice.TemplateId,
            id: field.id,
        }
        var fieldRequest = new CreateTabFieldRequest(fieldreq);
        this.onNewFieldAdded.next(fieldRequest);
    }


    getTabField() {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.setTabField();
                resolve(false);
            }
            else {
                this._httpClient.get<any>(environment.apiUrl + 'CustomTabFieldConfig/GetFieldById/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.onNewFieldAdded.next(response);
                        resolve(response);
                    }, reject);
            }
        });
    }


    addField(req) {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiUrl + 'CustomTabFieldConfig', { ...req })
                .subscribe((response: FieldResponse) => {
                    this.onNewFieldAdded.next(response);
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
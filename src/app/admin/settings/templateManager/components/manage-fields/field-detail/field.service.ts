import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { FieldType, FieldResponse, CreateTabFieldRequest } from '../field.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SetupService } from '../../manage-templates/setup.service';


@Injectable({
    providedIn: 'root'
})
export class FieldService {
    routeParams: any;

    onfieldsChanged: BehaviorSubject<any>;

    customTemplateId: BehaviorSubject<number>;
    tabId: number;
    fieldTypes: BehaviorSubject<FieldType[]>;

    onNewFieldAdded: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient, private templateservice: SetupService) {
        this.onNewFieldAdded = new BehaviorSubject<any>({});
        this.fieldTypes = new BehaviorSubject<FieldType[]>(null);
        this.onfieldsChanged = new BehaviorSubject<any>({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.tabId = route.parent.params["id"];
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

    setTabField(field?: any) {
        this.getFieldTypes();
        field = field || {};
        var fieldreq = {
            tabId: this.templateservice.TemplateId,
            id: field.id
        }
        var fieldRequest = new CreateTabFieldRequest(fieldreq);
        this.onNewFieldAdded.next(fieldRequest);
    }

    setTemplateField(field?: any) {
        this.getFieldTypes();
        this.onNewFieldAdded.next(this.templateservice.TemplateId);
    }

    getTemplateFields(tabId?: number) {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'CustomTabFieldConfig/' + this.tabId)
                .subscribe((response: any) => {
                    this.onfieldsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getTabField(id){
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'CustomTabFieldConfig/GetFieldById/' + id)
                .subscribe((response: any) => {
                    this.onNewFieldAdded.next(response);
                    resolve(response);
                }, reject);
        });
    }

    
    addField(req) {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiUrl + 'CustomTabFieldConfig', { ...req })
                .subscribe((response: FieldResponse) => {
                    this.onNewFieldAdded.next(response);
                    this.getTemplateFields(req.tabId);
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
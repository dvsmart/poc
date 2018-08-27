import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, pipe } from "rxjs";
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { map } from "rxjs/operators";
import { FieldConfig } from "@core/components/custom-controls/models/fieldConfig";
import { CustomEntityInstance } from "./components/templateForm/template-Form.component";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    api = environment.apiUrl;
    onCategories: BehaviorSubject<any>;
    onTemplatesChanged: BehaviorSubject<any>;
    onTabsChanged: BehaviorSubject<any>;
    onFieldsChanged: BehaviorSubject<any>;
    onSelectedTemplateChanged: BehaviorSubject<any>;

    onInstancesChanged: BehaviorSubject<any>;

    fields: FieldConfig[];


    constructor(private http: HttpClient) {
        this.onCategories = new BehaviorSubject([]);
        this.onTemplatesChanged = new BehaviorSubject([]);
        this.onTabsChanged = new BehaviorSubject([]);
        this.onFieldsChanged = new BehaviorSubject([]);
        this.onSelectedTemplateChanged = new BehaviorSubject([]);
        this.onInstancesChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                //this.getCustomEntityCategories(),
                this.getCustomEntityRecords()
            ]).then(
                ([files]) => {

                    // this.onCategories.subscribe(searchText => {
                    //     this.searchText = searchText;
                    //     this.getProperties();
                    // });

                    // this.onFilterChanged.subscribe(filter => {
                    //     this.filterBy = filter;
                    //     this.getProperties();
                    // });

                    resolve();

                },
                reject
            );
        });
    }

    getCustomEntityRecords(){
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityInstance').subscribe(x => {
                this.onInstancesChanged.next(x);
                resolve(x);
            }, reject)
        })
    }

    getInstanceRecord(id){
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityInstance/' + id).subscribe(x => {
                this.onSelectedTemplateChanged.next(x);
                resolve(x);
            }, reject)
        })
    }

    getCustomEntityCategories() {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityGroup').subscribe(x => {
                this.onCategories.next(x);
                resolve(x);
            }, reject)
        })
    }

    getCustomEntityTemplates(groupId) {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiUrl + 'CustomEntityGroup/' + groupId).subscribe(x => {
                this.onTemplatesChanged.next(x);
                resolve(x);
            }, reject)
        })
    }

    getTabFieldsByTemplateId(templateId) {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiUrl + 'CustomTab/' + templateId)
            .subscribe((res: any) => {
                this.onSelectedTemplateChanged.next(res);
                resolve(res);
            });
        })
    }

    getCustomEntity(templateId){
        return this.http.get(environment.apiUrl + 'CustomTab/' + templateId);
    }

    getTabFields() {
        return this.onSelectedTemplateChanged.asObservable();
    }

    getFields() {
        return this.onFieldsChanged.asObservable();
    }

    saveCustomEntity(customEntitymodel: CustomEntityInstance){
        return this.http.post(environment.apiUrl + 'CustomEntityInstance',customEntitymodel).subscribe(
            x=>
            {
                if(x != null && x["recordId"] != undefined){
                    const instanceId = parseInt(x["recordId"]);
                    customEntitymodel.instanceId = instanceId
                    this.http.post(environment.apiUrl + 'CustomFieldValue', customEntitymodel).subscribe(
                        y=>{alert(y);}
                    )
                }
            });
    }

    ngOnDestroy() {
        this.onCategories.unsubscribe();
        this.onTemplatesChanged.unsubscribe();
        this.onSelectedTemplateChanged.unsubscribe();
    }

}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, pipe } from "rxjs";
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CustomEntityInstance } from "./components/templateForm/template-Form.component";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    api = environment.apiUrl;
    onInstancesChanged: BehaviorSubject<any>;
    onCustomEntityRecordChanged: BehaviorSubject<any>;

    onSelectedInstanceChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onInstancesChanged = new BehaviorSubject([]);
        this.onSelectedInstanceChanged = new BehaviorSubject({});
        this.onCustomEntityRecordChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getCustomEntityRecords()
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getCustomEntityRecords() {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityInstance').subscribe(x => {
                this.onInstancesChanged.next(x);
                resolve(x);
            }, reject)
        })
    }

    getCustomEntityRecord(id) {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityInstance/'+ id).subscribe(x => {
                debugger;
                this.onCustomEntityRecordChanged.next(x);
                resolve(x);
            }, reject)
        })
    }

    getEntityRecord(id){
        return this.http.get(this.api + 'CustomEntityInstance/'+ id);
    }

    getRecord(){
        return this.onCustomEntityRecordChanged.asObservable();
    }

    saveCustomEntity(customEntitymodel: CustomEntityInstance) {
        return this.http.post(environment.apiUrl + 'CustomEntityInstance', customEntitymodel).subscribe(
            x => {
                if (x != null && x["recordId"] != undefined) {
                    const instanceId = parseInt(x["recordId"]);
                    customEntitymodel.instanceId = instanceId
                    this.http.post(environment.apiUrl + 'CustomFieldValue', customEntitymodel).subscribe(
                        y => { alert(y); }
                    )
                }
            });
    }

    ngOnDestroy() {
        this.onInstancesChanged.unsubscribe();
        this.onSelectedInstanceChanged.unsubscribe();
    }

}
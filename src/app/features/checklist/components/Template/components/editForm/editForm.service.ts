import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from "@env/environment";
import { CustomEntityRecord, CustomEntityValue } from "../../../../models/custom.model";
import { SaveResponse } from "../../model/record.model";
import { takeUntil } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EditFormService {
    routeParams: any;
    record: any;
    onRecordChanged: BehaviorSubject<any>;
    templateId: BehaviorSubject<number>;

    constructor(
        private _httpClient: HttpClient
    ) {
        this.onRecordChanged = new BehaviorSubject({});
        this.templateId = new BehaviorSubject(0);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getRecord()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getRecord(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.templateId.subscribe(id => {
                    this._httpClient.get<any>(environment.apiUrl + 'NewTemplateFormRecord/' + id).subscribe(response => {
                        this.record = response;
                        this.onRecordChanged.next(this.record);
                        resolve(false);
                    }, reject);
                })
            }
            else {
                this._httpClient.get<CustomEntityRecord>(environment.apiUrl + 'TemplateFormRecord/' + this.routeParams.id)
                    .subscribe((response: CustomEntityRecord) => {
                        this.record = response;
                        this.onRecordChanged.next(this.record);
                        resolve(response);
                    }, reject);
            }
        });
    }

    addRecord(customEntitymodel: CustomEntityValue): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post<SaveResponse>(environment.apiUrl + 'TemplateFormRecord', customEntitymodel)
                .subscribe((response: SaveResponse) => {
                    customEntitymodel.CustomEntityValueId = response.recordId;
                    this._httpClient.post<SaveResponse>(environment.apiUrl + 'TemplateFormValue', customEntitymodel).subscribe((res: SaveResponse) => {
                        this.getRecord();
                    });
                }, reject);
        });
    }

    updateRecord(customEntitymodel: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post<SaveResponse>(environment.apiUrl + 'TemplateFormRecord', customEntitymodel)
                .subscribe((response: any) => {
                    this._httpClient.post<SaveResponse>(environment.apiUrl + 'TemplateFormValue', customEntitymodel).subscribe((res: SaveResponse) => {
                        this.getRecord();
                    });
                }, reject);
        });
    }

    add(customEntitymodel: CustomEntityValue) {
        return this._httpClient.post<SaveResponse>(environment.apiUrl + 'TemplateFormRecord', customEntitymodel);
    }

    update(customEntitymodel: CustomEntityValue) {
        return this._httpClient.post<SaveResponse>(environment.apiUrl + 'TemplateFormRecord', customEntitymodel);
    }

    updateFields(customEntitymodel: CustomEntityValue) {
        return this._httpClient.post(environment.apiUrl + 'TemplateFormValue', customEntitymodel);
    }
}

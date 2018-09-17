import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from 'environments/environment';
import { BehaviorSubject } from "rxjs";
import { CustomEntityValue, CustomEntityRecord } from "../../models/custom.model";
import { CustomTemplate, SaveResponse } from "./model/record.model";

export class PagedResult {
    data: any[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
}


@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    api = environment.apiUrl;
    onRecordsChanged: BehaviorSubject<any>;
    customEntityId: BehaviorSubject<number>;

    result: BehaviorSubject<PagedResult>;

    constructor(private http: HttpClient) {
        this.onRecordsChanged = new BehaviorSubject([]);
        this.customEntityId = new BehaviorSubject(0);
        this.result = new BehaviorSubject(new PagedResult);
    }

    getCustomTempalateId(){
        return this.customEntityId.asObservable();
    }
    

    getcevRecords(templateId, page, pageSize): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityInstance?templateId=' + templateId + '&page=' + page + '&pageSize=' + pageSize)
                .subscribe((response: PagedResult) => {
                    this.result.next(response);
                    this.onRecordsChanged.next(response.data);
                    resolve(response);
                }, reject);
            }
        );
    }


    editRecord(id: number) {
        return this.http.get<CustomEntityRecord>(environment.apiUrl + 'CustomEntityInstance/' + id);
    }

    createRecord() {
        return this.http.get<any>(environment.apiUrl + 'TemplateDefinition/' + this.customEntityId.getValue());
    }

    deleteRecord(id){
        return this.http.delete<SaveResponse>(environment.apiUrl + 'CustomEntityInstance?id=' + id);
    }

    getCustomEntityId() {
        return this.customEntityId.asObservable()
    }

    getTemplateInformation(id) {
        this.getcevRecords(id, 1, 10);
        return this.http.get<CustomTemplate>(environment.apiUrl + 'TemplateDefinition/' + id);
    }

    createNewRecord(customEntitymodel: CustomEntityValue) {
        return this.http.post<SaveResponse>(environment.apiUrl + 'CustomEntityInstance', customEntitymodel);
    }

    saveCustomFields(customEntitymodel: CustomEntityValue) {
        return this.http.post<SaveResponse>(environment.apiUrl + 'CustomFieldValue', customEntitymodel);
    }
}
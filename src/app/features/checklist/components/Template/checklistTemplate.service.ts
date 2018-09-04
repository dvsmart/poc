import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from 'environments/environment';
import { CustomEntityValue, CustomEntityRecord } from "./components/templateForm/template-Form.component";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

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
    

    getcevRecords(templateId, page, pageSize): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityInstance/GetCEVRecords/' + templateId + '?page=' + page + '&pageSize=' + pageSize)
                .subscribe((response: PagedResult) => {
                    this.result.next(response);
                    this.onRecordsChanged.next(response.data);
                    resolve(response);
                }, reject);
            }
        );
    }



    // getcevRecords(templateId: number, page: number, pageSize?: number) {
    //     page = page == undefined ? 1 : page;
    //     pageSize = pageSize == null || pageSize == undefined ? 10 : pageSize;
    //     return this.http.get<PagedResult>(environment.apiUrl + 'CustomEntityInstance/GetCEVRecords/' + templateId + '?page=' + page + '&pageSize=' + pageSize)
    //         .subscribe(x => {
    //             this.cevRecords.next(x);
    //         });
    // }

    getCustomEntityValues(templateId: number, page: number, pageSize: number) {
        return this.http.get<PagedResult>(environment.apiUrl + 'CustomEntityInstance/GetCEVRecords/' + templateId + '?page=' + page + '&pageSize=' + pageSize);
    }


    editRecord(id: number) {
        return this.http.get<any>(environment.apiUrl + 'CustomEntityInstance/EditCevRecord/' + id);
    }

    createRecord(templateId: number) {
        return this.http.get<any>(environment.apiUrl + 'CustomEntity/' + templateId);
    }

    getCustomEntityId() {
        return this.customEntityId.asObservable()
    }

    getTemplateInformation(id) {
        this.getcevRecords(id, 1, 10);
        return this.http.get<CustomTemplate>(environment.apiUrl + 'CustomEntity/templateInfo/' + id);
    }

    createNewRecord(customEntitymodel: CustomEntityValue) {
        return this.http.post<SaveResponse>(environment.apiUrl + 'CustomEntityInstance', customEntitymodel);
    }

    saveCustomFields(customEntitymodel: CustomEntityValue) {
        return this.http.post<SaveResponse>(environment.apiUrl + 'CustomFieldValue', customEntitymodel);
    }

}

export class CustomTemplate {
    groupName: string;
    templateName: string;
    id: number;
}

export class SaveResponse {
    errorMessage: string;
    recordId: number;
    saveSuccessful: boolean;
    savedDataId: string;
    savedEntityId: number;
}
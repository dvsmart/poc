import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from 'environments/environment';
import { CustomEntityValue, CustomEntityRecord } from "./components/templateForm/template-Form.component";
import { BehaviorSubject, Observable } from "rxjs";

export class PagedResult{
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

    cevRecords: BehaviorSubject<any>;

    customEntityId: BehaviorSubject<number>;

    total: BehaviorSubject<number>;
    pageSize: BehaviorSubject<number>;

    page: 1;
    size: 10;

    constructor(private http: HttpClient) {
        this.cevRecords = new BehaviorSubject([]);
        this.customEntityId = new BehaviorSubject(0);
        this.total = new BehaviorSubject(0);
        this.pageSize = new BehaviorSubject(0);
    }

    getcevRecords(templateId: number, page: number, pageSize?: number) {
        page = page == undefined ? this.page : page;
        pageSize = pageSize == null || pageSize == undefined ? this.size : pageSize;
        return this.http.get<PagedResult>(environment.apiUrl + 'CustomEntityInstance/GetCEVRecords/' + templateId + '?page=' + page + '&pageSize=' + pageSize)
            .subscribe(x => {
                this.cevRecords.next(x);
            });
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


    saveCustomEntity(customEntitymodel: CustomEntityValue) {
        return this.http.post(environment.apiUrl + 'CustomEntityInstance', customEntitymodel).subscribe(
            x => {
                if (x != null && x["recordId"] != undefined) {
                    const recordId = parseInt(x["recordId"]);
                    customEntitymodel.CustomEntityValueId = recordId
                    this.http.post(environment.apiUrl + 'CustomFieldValue', customEntitymodel).subscribe(
                        () => {
                            this.getcevRecords(customEntitymodel.customEntityId, 1, 10);
                        }
                    )
                }
            });
    }

    ngOnDestroy(){
        this.total.unsubscribe();
        this.pageSize.unsubscribe();
        this.cevRecords.unsubscribe();
    }


}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from 'environments/environment';
import { CustomEntityValue, CustomEntityRecord } from "./components/templateForm/template-Form.component";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    api = environment.apiUrl;

    cevRecords: BehaviorSubject<any>;

    customEntityId: BehaviorSubject<number>;

    total: BehaviorSubject<number>;
    pageSize: BehaviorSubject<number>;


    constructor(private http: HttpClient) {
        this.cevRecords = new BehaviorSubject([]);
        this.customEntityId = new BehaviorSubject(0);
    }

    getcevRecords(templateId: number) {
        return this.http.get(environment.apiUrl + 'CustomEntityInstance/GetCEVRecords/' + templateId)
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
                debugger;
                if (x != null && x["recordId"] != undefined) {
                    const recordId = parseInt(x["recordId"]);
                    customEntitymodel.CustomEntityValueId = recordId
                    this.http.post(environment.apiUrl + 'CustomFieldValue', customEntitymodel).subscribe(
                        () => {
                            this.getcevRecords(customEntitymodel.customEntityId);
                        }
                    )
                }
            });
    }


}
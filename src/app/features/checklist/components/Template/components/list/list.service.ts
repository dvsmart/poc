import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from "@env/environment";
import { PagedResult } from "../../../../models/custom.model";
import { CustomTemplate } from "../../model/record.model";

@Injectable({
    providedIn: 'root'
})
export class ListService {
    routeParams: any;
    recordsResult: PagedResult;
    customEntityValues: any[];
    onRecordsChanged: BehaviorSubject<any>;
    constructor(private _httpClient: HttpClient) {
        this.onRecordsChanged = new BehaviorSubject({});
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getRecords(1, 10)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getRecords(page?: number, size?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            page = page === undefined ? 1 : page;
            size = size === undefined ? 10 : size;
            this._httpClient.get<PagedResult>(environment.apiUrl + 'CustomEntityInstance?templateId=' + this.routeParams.id + '&page=' + page + '&pageSize=' + size)
                .subscribe((response: PagedResult) => {
                    this.recordsResult = response;
                    this.customEntityValues = response.data;
                    this.onRecordsChanged.next(this.recordsResult);
                    resolve(this.customEntityValues);
                }, reject);
        }
        );
    }

    getTemplateInformation(id) {
        return this._httpClient.get<CustomTemplate>(environment.apiUrl + 'TemplateDefinition/' + id);
    }
}
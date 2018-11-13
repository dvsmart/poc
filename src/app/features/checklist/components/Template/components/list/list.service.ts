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

    onTemplatechanged: BehaviorSubject<CustomTemplate>;
    constructor(private _httpClient: HttpClient) {
        this.onRecordsChanged = new BehaviorSubject({});
        this.onTemplatechanged = new BehaviorSubject(null);
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getRecords(1, 10),
                this.getTemplateInformation()
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
            this._httpClient.get<PagedResult>(environment.apiUrl + 'TemplateFormRecord?templateId=' + this.routeParams.id + '&page=' + page + '&pageSize=' + size)
                .subscribe((response: PagedResult) => {
                    this.recordsResult = response;
                    this.customEntityValues = response.data;
                    this.onRecordsChanged.next(this.recordsResult);
                    resolve(this.customEntityValues);
                }, reject);
        }
        );
    }

    getTemplateInformation(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'CustomTemplateConfig/' + this.routeParams.id)
                .subscribe((response: any) => {
                    let template = new CustomTemplate(response);
                    this.onTemplatechanged.next(template);
                    resolve(template);
                }, reject);
        }
        );
    }
}
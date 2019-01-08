import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class FormListService {
    routeParams: any;
    customEntityValues: any[];
    onRecordsChanged: BehaviorSubject<any>;

    onTemplatechanged: BehaviorSubject<any>;
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
            this._httpClient.get<any>(environment.apiUrl + 'LiveForms/all?formId=' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.onRecordsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getTemplateInformation(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'Forms/detail?id=' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.onTemplatechanged.next(response);
                    resolve(response);
                }, reject);
        }
        );
    }
}
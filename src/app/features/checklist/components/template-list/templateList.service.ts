import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { environment } from 'environments/environment';
import { TemplateList } from "../../models/custom.model";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class TemplateListService {
    api = environment.apiUrl + 'TemplateCategory/';
    templates: any;
    onTemplatesChanged: BehaviorSubject<any>;
    routeParams: any;

    constructor(private _httpClient: HttpClient) {
        this.onTemplatesChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTemplates()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    getTemplates() {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onTemplatesChanged.next(false);
                resolve(false);
            }
            else {
                this._httpClient.get<any>(this.api + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.templates = response;
                        this.onTemplatesChanged.next(this.templates);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
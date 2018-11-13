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
    api = environment.apiUrl + 'CustomTemplateConfig/';
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
            this._httpClient.get(this.api).subscribe(x => {
                this.templates = x;
                this.onTemplatesChanged.next(this.templates);
                resolve(x);
            }, reject)
        })
    }
}
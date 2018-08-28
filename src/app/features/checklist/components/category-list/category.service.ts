import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, pipe } from "rxjs";
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CategoryListService {
    api = environment.apiUrl;
    onCategories: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onCategories = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getCustomEntityCategories(),
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getCustomEntityCategories() {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'CustomEntityGroup').subscribe(x => {
                this.onCategories.next(x);
                resolve(x);
            }, reject)
        })
    }


    ngOnDestroy() {
        this.onCategories.unsubscribe();
    }

}
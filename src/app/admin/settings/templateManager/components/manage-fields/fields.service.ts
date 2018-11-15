import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class FieldsService {
    routeParams: any;

    onfieldsChanged: BehaviorSubject<any>;

    templateId: number;

    edit: boolean;

    constructor(private _httpClient: HttpClient) {
        this.onfieldsChanged = new BehaviorSubject<any>({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.templateId = route.parent.params["id"];
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTemplateFields()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getTemplateFields() {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'CustomTabFieldConfig/' + this.templateId)
                .subscribe((response: any) => {
                    this.onfieldsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    delete(id){
        
    }
}
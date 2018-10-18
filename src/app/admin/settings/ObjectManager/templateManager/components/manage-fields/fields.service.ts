import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FieldsService {
    fields: BehaviorSubject<any>;
    routeParams:any;
    constructor(private _httpClient: HttpClient) {
        this.fields = new BehaviorSubject<any>(null);
    }

    getFields(tabId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(environment.apiUrl + 'CustomFieldConfig/' + tabId)
                .subscribe((response: any) => {
                    this.fields.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
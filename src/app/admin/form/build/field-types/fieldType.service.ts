import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class FieldTypeService {
    fieldTypes: BehaviorSubject<any>;
    constructor(private http: HttpClient) {
        this.fieldTypes = new BehaviorSubject<any>({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFieldTypes()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    getFieldTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(environment.apiUrl + 'FieldTypes')
                .subscribe((response: any) => {
                    this.fieldTypes.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
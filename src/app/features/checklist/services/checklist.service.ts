import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {

    onCategories: BehaviorSubject<any>;
    onTemplatesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onCategories = new BehaviorSubject([]);
        this.onTemplatesChanged = new BehaviorSubject([]);
    }

    getCustomEntityCategories() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiUrl + 'CustomEntityGroup').subscribe(x => {
                this.onCategories.next(x);
                resolve(x);
            }, reject)
        })
    }

    getCustomEntityTemplates() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiUrl + 'CustomEntityTemplate').subscribe(x => {
                this.onTemplatesChanged.next(x);
                resolve(x);
            }, reject)
        })
    }
    
}
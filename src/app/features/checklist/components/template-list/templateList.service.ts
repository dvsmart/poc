import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, pipe } from "rxjs";
import { environment } from 'environments/environment';
import { TemplateList } from "../../models/custom.model";


@Injectable({
    providedIn: 'root'
})
export class TemplateListService {
    api = environment.apiUrl;
  
    onTemplatesChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.onTemplatesChanged = new BehaviorSubject([]);
    }


    getCustomEntityTemplates(groupId) {
        // return new Promise((resolve, reject) => {
        //     this.http.get(environment.apiUrl + 'CustomEntityGroup/' + groupId).subscribe(x => {
        //         this.onTemplatesChanged.next(x);
        //         resolve(x);
        //     }, reject)
        // })
        return this.http.get<TemplateList>(environment.apiUrl + 'CustomEntityGroup/' + groupId);
    }


    getCustomEntity(templateId){
        return this.http.get(environment.apiUrl + 'CustomTab/' + templateId);
    }


    ngOnDestroy() {
        this.onTemplatesChanged.unsubscribe();
    }

}
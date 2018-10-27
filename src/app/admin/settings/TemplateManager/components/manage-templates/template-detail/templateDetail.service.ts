import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { TemplateDetail } from "../template.model";

@Injectable({
    providedIn: 'root'
})

export class TemplateDetailService {
    routeParams: any;
    onTemplateChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.onTemplateChanged = new BehaviorSubject<any>({});
    }
    
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { SetupService } from '../../manage-templates/setup.service';

@Injectable({
    providedIn: 'root'
})

export class TabService {
    routeParams: any;
    onSelectedTabChanged: BehaviorSubject<any>;
    constructor(private _httpClient: HttpClient,private templateservice: SetupService) {
        this.onSelectedTabChanged = new BehaviorSubject<any>({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTabDetail()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getTabDetail() {
        if (this.routeParams.id != 'new') {
            return new Promise((resolve, reject) => {
                this._httpClient.get<any>(environment.apiUrl + 'CustomTabConfig/GetById/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.onSelectedTabChanged.next([response, 'edit']);
                        resolve(response);
                    }, reject);
            });
        }else{
            var tabRequest = {
                templateId: this.templateservice.TemplateId,
                tabId: 0,
                caption: ''
            }
            this.onSelectedTabChanged.next([tabRequest, 'new']);
        }
    }

    addTab(tabRequest) {
        return new Promise((resolve, reject) => {
          this._httpClient.post(environment.apiUrl + 'CustomTabConfig', { ...tabRequest })
            .subscribe((response: any) => {
                this.onSelectedTabChanged.next([response, 'edit']);
                this.templateservice.getCustomTabs();
              resolve(response);
            }, reject);
        });
      }
}
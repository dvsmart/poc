import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { SetupService } from '../../manage-templates/setup.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})

export class TabsService {
    onTabsChanged: BehaviorSubject<any>;
    templateId: number;
    constructor(private _httpClient: HttpClient, private templateservice: SetupService, private location: Location, private toaster: MatSnackBar) {
        this.onTabsChanged = new BehaviorSubject<any>({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.templateId = route.parent.params["id"];
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getCustomTabs()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCustomTabs(id?: number): Promise<any> {
        if (this.templateId.toString() !== "new") {
            return new Promise((resolve, reject) => {
                this._httpClient.get<any>(environment.apiUrl + 'FormTab/Tabs?templateId=' + this.templateId)
                    .subscribe((response: any) => {
                        this.onTabsChanged.next(response);
                        resolve(response);
                    }, reject);
            });
        }
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { SetupService } from '../../manage-templates/setup.service';
import { Location } from '@angular/common';
import { MessageService } from '@core/services/message.service';
import { MatSnackBar } from '@angular/material';
import { FieldService } from '../../manage-fields/field-detail/field.service';

@Injectable({
    providedIn: 'root'
})

export class TabService {
    routeParams: any;
    onSelectedTabChanged: BehaviorSubject<any>;
    constructor(private _httpClient: HttpClient, private templateservice: SetupService, private location: Location, private toaster: MatSnackBar,private fieldservice: FieldService) {
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
                        this.onSelectedTabChanged.next(response);
                        this.fieldservice.getTemplateFields(this.routeParams.id);
                        resolve(response);
                    }, reject);
            });
        } else {
            const tab = this.buildTabRequest();
            this.onSelectedTabChanged.next(tab);
        }
    }

    addTab(tabRequest) {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiUrl + 'CustomTabConfig', { ...tabRequest })
                .subscribe((response: any) => {
                    this.onSelectedTabChanged.next(response);
                    this.templateservice.getCustomTabs();
                    this.location.go('admin/customObject/templateManagement/' + tabRequest.customTemplateId + '/tabs/' + response.id);
                    this.toaster.open("Added Successfully", 'Done', { duration: 1000 });
                    resolve(response);
                }, reject);
        });
    }

    buildTabRequest() {
        var tabRequest = {
            customTemplateId: this.templateservice.TemplateId,
        }
        return tabRequest
    }
}
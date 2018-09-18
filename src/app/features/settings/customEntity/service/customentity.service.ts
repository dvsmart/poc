import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CustomTabModel, CustomFieldModel } from '../models/customEntity.model';
import { SaveResponse } from '../../../checklist/components/Template/model/record.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomentityService {
  customGroups: BehaviorSubject<any>;
  groups: Group[];
  constructor(private http: HttpClient) {
    this.customGroups = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCustomGroups()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getCustomGroups(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<Group[]>(environment.apiUrl + 'Management')
        .subscribe((response: Group[]) => {
          debugger;
          this.groups = response;
          this.customGroups.next(this.groups);
          resolve(this.groups);
        }, reject);
    }
    );
  }

  getGroups() {
    return this.http.get<Group[]>(environment.apiUrl + 'Management');
  }

  createTab(tabRequestModel: CustomTabModel) {
    return this.http.post<SaveResponse>(environment.apiUrl + 'CustomTab', tabRequestModel);
  }

  createTabField(tabFieldRequestModel: CustomFieldModel) {
    return this.http.post<SaveResponse>(environment.apiUrl + 'Customfield', tabFieldRequestModel);
  }

}

export interface Field {
  fieldId: number;
  caption: string;
}

export interface Tab {
  tabId: number;
  tabName: string;
  fields: Field[];
}

export interface Template {
  templateId: number;
  templateName: string;
  tabs: Tab[];
}

export interface Group {
  groupId: number;
  name: string;
  templates: Template[];
}

export class Entity {
  groups: Group[];
}
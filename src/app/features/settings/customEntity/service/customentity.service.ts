import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CustomTabModel, CustomFieldModel, Category, CustomTemplateTab, customGroupTemplate, CreateCustomTemplateRequest, CreateCustomTabRequest, CustomTabResponse } from '../models/customEntity.model';
import { SaveResponse } from '../../../checklist/components/Template/model/record.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomentityService {
  customGroups: BehaviorSubject<Category[]>;
  customTemplates: BehaviorSubject<customGroupTemplate>;
  customTabs: BehaviorSubject<CustomTabResponse>;

  constructor(private http: HttpClient) {
    this.customGroups = new BehaviorSubject<Category[]>(null);
    this.customTemplates = new BehaviorSubject<customGroupTemplate>(null);
    this.customTabs = new BehaviorSubject<CustomTabResponse>(null);
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
      this.http.get<Category[]>(environment.apiUrl + 'CustomEntityGroup')
        .subscribe((response: Category[]) => {
          this.customGroups.next(response);
          resolve(response);
        }, reject);
    });
  }

  getCustomTemplates(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<customGroupTemplate>(environment.apiUrl + 'TemplateDefinition/' + id)
        .subscribe((response: customGroupTemplate) => {
          this.customTemplates.next(response);
          resolve(response);
        }, reject);
    });
  }

  getCustomTabs(templateId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<CustomTabResponse>(environment.apiUrl + 'CustomTab/' + templateId)
        .subscribe((response: CustomTabResponse) => {
          this.customTabs.next(response);
          resolve(response);
        }, reject);
    });
  }

  addCustomGroup(categoryName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<SaveResponse>(environment.apiUrl + 'CustomEntityGroup', { categoryName })
        .subscribe((response: SaveResponse) => {
          this.getCustomGroups();
          resolve(response);
        }, reject);
    });
  }

  addCustomTemplate(CreateCustomTemplateRequest: CreateCustomTemplateRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<SaveResponse>(environment.apiUrl + 'TemplateDefinition', CreateCustomTemplateRequest)
        .subscribe((response: SaveResponse) => {
          this.getCustomTemplates(CreateCustomTemplateRequest.groupId);
          resolve(response);
        }, reject);
    });
  }

  addCustomTab(tab: CreateCustomTabRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<SaveResponse>(environment.apiUrl + 'CustomTab', tab)
        .subscribe((response: SaveResponse) => {
          this.getCustomTabs(tab.customEntityId);
          resolve(response);
        }, reject);
    });
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


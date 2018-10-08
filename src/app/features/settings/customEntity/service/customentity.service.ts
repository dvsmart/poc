import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CustomTabModel, CustomFieldModel, Category, CustomTemplateTab, customGroupTemplate, CreateCustomTemplateRequest, CreateCustomTabRequest, CustomTabResponse, TemplateTab, TemplateTabField } from '../models/customEntity.model';
import { SaveResponse } from '../../../checklist/components/Template/model/record.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomField } from '../../../checklist/models/custom.model';

@Injectable({
  providedIn: 'root'
})
export class CustomentityService {
  customGroups: BehaviorSubject<Category[]>;
  customTemplates: BehaviorSubject<customGroupTemplate>;
  customTabs: BehaviorSubject<CustomTabResponse>;
  customTabFields: BehaviorSubject<any>;
  tabFields: BehaviorSubject<any[]>;
  onSearchTextChanged: Subject<any>;
  searchText: string;

  constructor(private http: HttpClient) {
    this.customGroups = new BehaviorSubject<Category[]>(null);
    this.customTemplates = new BehaviorSubject<customGroupTemplate>(null);
    this.customTabs = new BehaviorSubject<CustomTabResponse>(null);
    this.customTabFields = new BehaviorSubject<TemplateTab>(null);
    this.tabFields = new BehaviorSubject<any[]>(null);
    this.onSearchTextChanged = new Subject();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTemplateCategories()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getTemplateCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<Category[]>(environment.apiUrl + 'TemplateCategory')
        .subscribe((response: Category[]) => {
          this.customGroups.next(response);
          resolve(response);
        }, reject);
    });
  }

  getTemplates(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<customGroupTemplate>(environment.apiUrl + 'TemplateCategory/' + id)
        .subscribe((response: customGroupTemplate) => {
          this.customTemplates.next(response);
          resolve(response);
        }, reject);
    });
  }

  getCustomTabs(templateId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<CustomTabResponse>(environment.apiUrl + 'Template/' + templateId)
        .subscribe((response: CustomTabResponse) => {
          this.customTabs.next(response);
          resolve(response);
        }, reject);
    });
  }

  addCustomGroup(categoryName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<SaveResponse>(environment.apiUrl + 'TemplateCategory', { categoryName })
        .subscribe((response: SaveResponse) => {
          this.getTemplateCategories();
          resolve(response);
        }, reject);
    });
  }

  addCustomTemplate(CreateCustomTemplateRequest: CreateCustomTemplateRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<SaveResponse>(environment.apiUrl + 'Template', CreateCustomTemplateRequest)
        .subscribe((response: SaveResponse) => {
          this.getTemplates(CreateCustomTemplateRequest.groupId);
          resolve(response);
        }, reject);
    });
  }

  addTemplateTab(tab: CreateCustomTabRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<SaveResponse>(environment.apiUrl + 'TemplateTab', tab)
        .subscribe((response: SaveResponse) => {
          this.getCustomTabs(tab.customEntityId);
          resolve(response);
        }, reject);
    });
  }

  createTab(tabRequestModel: CustomTabModel) {
    return this.http.post<SaveResponse>(environment.apiUrl + 'TemplateTab', tabRequestModel);
  }

  createTabField(tabFieldRequestModel: CustomFieldModel) {
    return this.http.post<SaveResponse>(environment.apiUrl + 'TemplateFormControl', tabFieldRequestModel);
  }

  getTabFields(tabId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + 'TemplateTab?id=' + tabId)
        .subscribe((response: TemplateTab) => {
          this.customTabFields.next(response);
          //this.tabFields.next(response.customFields);
          resolve(response);
        }, reject);
    });
  }

  CreateCustomField(customFieldModel: CustomFieldModel) {
    this.http.post(environment.apiUrl + 'TemplateFormControl', customFieldModel).subscribe((res: SaveResponse) => {
      if (res.saveSuccessful) {
        this.getCustomTabs(customFieldModel.customEntityId);
        this.getTabFields(customFieldModel.customTabId);
      }
    })
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


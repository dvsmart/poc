import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { FormFieldRequestModel } from '../field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  routeParams: any;
  fields: BehaviorSubject<any>;
  fieldTypes: BehaviorSubject<any>;
  fieldTypeSpecification: BehaviorSubject<any>;

  tabs: BehaviorSubject<any>;
  formId: number;
  onfieldChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.fields = new BehaviorSubject<any>(null);
    this.fieldTypes = new BehaviorSubject<any>({});
    this.fieldTypeSpecification = new BehaviorSubject<any>({});
    this.tabs = new BehaviorSubject<any>({});
    this.onfieldChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    this.formId = route.parent.params["id"];
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getFieldTypes(),
        this.getTabs()
      ]).then(
        () => {
          if(this.routeParams.id != undefined){
            this.getField();
          }
          resolve();
        },
        reject
      );
    });
  }

  getField(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'FormFields?id=' + this.routeParams.id)
        .subscribe((response: any) => {
          this.onfieldChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

  getFieldTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'FieldTypes')
        .subscribe((response: any) => {
          this.fieldTypes.next(response);
          resolve(response);
        }, reject);
    });
  }

  getFieldType(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'FieldTypes/' + id)
        .subscribe((response: any) => {
          this.fieldTypeSpecification.next(response);
          resolve(response);
        }, reject);
    });
  }

  getFieldtypeAsync(id: number) {
    return this._httpClient.get<any>(environment.apiUrl + 'FormFieldTypes/' + id);
  }

  getTabs(): Promise<any> {
    console.log(this.formId);
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'FormTabs/' + this.formId)
        .subscribe((response: any) => {
          this.tabs.next(response);
          console.log(response);
          resolve(response);
        }, reject);
    });
  }

  getTabsAsync() {
    return this._httpClient.get<any>(environment.apiUrl + 'FormTabs/' + this.formId);
  }

  SaveField(formFieldRequest: FormFieldRequestModel) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'FormFields', { ...formFieldRequest })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  ngOnDestroy() {
    this.fieldTypeSpecification.next('');
    this.fieldTypeSpecification.complete();
  }
}

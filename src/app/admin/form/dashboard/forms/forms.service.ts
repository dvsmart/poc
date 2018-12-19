import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { FuseUtils } from '@core/utils';
import { FormRequestModel } from '../form/FormRequestModel';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  routeParams: any;
  forms: BehaviorSubject<any>;
  onSearchFormTextChanged: BehaviorSubject<string>;
  searchText: string;
  constructor(private _httpClient: HttpClient) {
    this.forms = new BehaviorSubject<any>(null);
    this.onSearchFormTextChanged = new BehaviorSubject<string>(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        //this.getForms()
      ]).then(
        () => {
          this.onSearchFormTextChanged.subscribe(searchText => {
            this.searchText = searchText;
            this.getForms();
          });
          resolve();
        },
        reject
      );
    });
  }

  saveForm(formRequestModel: FormRequestModel) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}Forms`, formRequestModel)
        .subscribe((response: any) => {
          this.getForms();
          resolve(response);
        }, reject);
    });
  }

  getForms() {
    if (this.routeParams.id === 'forms' && this.routeParams.slug === 'uncategorised') {
      this.getUncategorisedForms(1, 20)
    } else if (this.routeParams.id === 'forms' && this.routeParams.slug === 'deleted') {
      this.getDeletedForms(1, 20);
    } else if (this.routeParams.id === 'forms' && this.routeParams.slug === 'archived') {
      this.getArchivedForms(1, 20);
    } else {
      this.getCategorisedForms(this.routeParams.id, 1, 20);
    }
  }

  getUncategorisedForms(page, pageSize): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Forms/uncategorised?page=' + page + '&pageSize=' + pageSize)
        .subscribe((response: any) => {
          if (this.searchText && this.searchText !== '') {
            response.Results = FuseUtils.filterArrayByString(response.Results, this.searchText);
            this.forms.next(response);
          } else {
            this.forms.next(response);
          }
          resolve(response);
        }, reject);
    });
  }

  getDeletedForms(page, pageSize): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Forms/deleted??page=' + page + '&pageSize=' + pageSize)
        .subscribe((response: any) => {
          if (this.searchText && this.searchText !== '') {
            response.Results = FuseUtils.filterArrayByString(response.Results, this.searchText);
            this.forms.next(response);
          } else {
            this.forms.next(response);
          }
          resolve(response);
        }, reject);
    });
  }

  getArchivedForms(page, pageSize): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Forms/archived?page=' + page + '&pageSize=' + pageSize)
        .subscribe((response: any) => {
          if (this.searchText && this.searchText !== '') {
            response.Results = FuseUtils.filterArrayByString(response.Results, this.searchText);
            this.forms.next(response);
          } else {
            this.forms.next(response);
          }
          resolve(response);
        }, reject);
    });
  }

  getCategorisedForms(id, page?, pageSize?): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(`${environment.apiUrl}Forms/${id}?page=${page}&pageSize=${pageSize}`)
        .subscribe((response: any) => {
          this.forms.next(response);
          resolve(response);
        }, reject);
    });
  }

  deleteSelectedForms(ids: any) {
    return new Promise((resolve, reject) => {
      this._httpClient.post<any>(`${environment.apiUrl}Forms/delete?ids=`, { ids })
        .subscribe((response: any) => {
          this.getForms();
          resolve(response);
        }, reject);
    });
  }

  archiveSelectedForms(ids: any) {
    return new Promise((resolve, reject) => {
      this._httpClient.post<any>(`${environment.apiUrl}Forms/archive?ids=`, { ids })
        .subscribe((response: any) => {
          this.getForms();
          resolve(response);
        }, reject);
    });
  }
}

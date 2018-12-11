import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  routeParams: any;
  forms: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.forms = new BehaviorSubject<any>(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getForms()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getForms() {
    if (this.routeParams.id === 'uncategorised') {
      this.getUncategorisedForms(1, 10)
    } else {
      this.getCategorisedForms(this.routeParams.id);
    }
  }

  getUncategorisedForms(page, pageSize): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Form/uncategorised?page=' + page + '&pageSize=' + pageSize)
        .subscribe((response: any) => {
          this.forms.next(response);
          resolve(response);
        }, reject);
    });
  }

  getCategorisedForms(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Form/Categories/' + id)
        .subscribe((response: any) => {
          this.forms.next(response);
          resolve(response);
        }, reject);
    });
  }
}

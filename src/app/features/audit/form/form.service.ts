import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CustomEntityRecord } from 'app/features/audit/custom.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  routeParams: any;
  onRecordChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.onRecordChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getRecord()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }


  getRecord(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<CustomEntityRecord>(environment.apiUrl + 'FormRecord/' + this.routeParams.id)
        .subscribe((response: any) => {
          this.onRecordChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

  saveRecord(data){
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'FormRecord/', data)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}

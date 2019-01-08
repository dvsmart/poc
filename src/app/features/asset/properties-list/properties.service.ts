import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { DataSourceRequest } from '@core/types/datasourceRequest';
import { PagedResult } from 'app/models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  propertiesResult: PagedResult;
  properties: any[];
  onPropertiesChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.onPropertiesChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getProperties(1, 10)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getProperties(page?: number, size?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'Properties?page=' + page + '&pageSize=' + size)
        .subscribe((response: any) => {
          this.propertiesResult = response;
          this.properties = response.results;
          this.onPropertiesChanged.next(this.propertiesResult);
          resolve(this.properties);
        }, reject);
    }
    );
  }
}

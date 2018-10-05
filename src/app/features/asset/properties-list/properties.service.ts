import { Injectable } from '@angular/core';
import { PagedResult } from '../../checklist/models/custom.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { DataSourceRequest } from '@core/types/datasourceRequest';

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
      this._httpClient.get<PagedResult>(environment.apiUrl + 'AssetProperties?page=' + page + '&pageSize=' + size)
        .subscribe((response: PagedResult) => {
          this.propertiesResult = response;
          this.properties = response.data;
          this.onPropertiesChanged.next(this.propertiesResult);
          resolve(this.properties);
        }, reject);
    }
    );
  }
}

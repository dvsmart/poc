import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  routeParams: any;
  risk: any;
  onRiskChanged: BehaviorSubject<any>;
  constructor(
    private _httpClient: HttpClient
  ) {
    this.onRiskChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getProperty()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getProperty(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onRiskChanged.next(false);
        resolve(false);
      }
      else {
        this.onRiskChanged.next(this.routeParams.id);
        resolve(this.routeParams.id);

        // this._httpClient.get<any>(environment.apiUrl + 'AssetProperties/' + this.routeParams.id)
        //   .subscribe((response: any) => {
        //     this.risk = response;
        //     this.onRiskChanged.next(this.risk);
        //     resolve(response);
        //   }, reject);
      }
    });
  }

}

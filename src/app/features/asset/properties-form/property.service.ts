import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { CreateAssetPropertyRequest } from '../models/createPropertyRequestModel';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  routeParams: any;
  property: any;
  onPropertyChanged: BehaviorSubject<any>;
  constructor(
    private _httpClient: HttpClient
  ) {
    this.onPropertyChanged = new BehaviorSubject({});
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
        this.onPropertyChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get<CreateAssetPropertyRequest>(environment.apiUrl + 'Properties/' + this.routeParams.id)
          .subscribe((response: CreateAssetPropertyRequest) => {
            this.property = response;
            this.onPropertyChanged.next(this.property);
            resolve(response);
          }, reject);
      }
    });
  }


  updateProperty(propertyModel: CreateAssetPropertyRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(environment.apiUrl + 'Properties', { ...propertyModel })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  addProperty(propertyModel: CreateAssetPropertyRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Properties', { ...propertyModel })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

}

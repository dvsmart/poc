import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryRequestModel } from './category/category';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  categories: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.categories = new BehaviorSubject<any>({});
  }

  getCategories(): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}FormCategories/`)
        .subscribe((response: any) => {
          this.categories.next(response);
          resolve(response);
        }, reject);
    });
  }

  saveCategory(categoryRequestModel: CategoryRequestModel) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}FormCategories/`, categoryRequestModel)
        .subscribe((response: any) => {
          this.categories.next([...this.categories.value,response]);
          resolve(response);
        }, reject);
    });
  }

  updateCategory(categoryRequestModel: CategoryRequestModel) {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiUrl}FormCategories/${categoryRequestModel.id}`, categoryRequestModel)
        .subscribe((response: any) => {
          this.categories.next([...this.categories.value,response]);
          resolve(response);
        }, reject);
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryRequestModel } from './category/category';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResponseModel } from "app/models/ResponseModel";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  categories: BehaviorSubject<any>;
  routeParams: any;
  constructor(private http: HttpClient) {
    this.categories = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCategories()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
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
          this.getCategories();
          resolve(response);
        }, reject);
    });
  }

  updateCategory(categoryRequestModel: CategoryRequestModel) {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiUrl}FormCategories`, categoryRequestModel)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  deleteCategory(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiUrl}FormCategories?id=${id}`)
        .subscribe((response: ResponseModel) => {
          debugger;
          resolve(response);
        }, reject);
    });
  }

  deleteCategoryWithForms(id: number, deleteForms: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}FormCategories/deleteForms`, { id, deleteForms })
        .subscribe((response: ResponseModel) => {
          resolve(response);
        }, reject);
    });
  }
}

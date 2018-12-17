import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryRequestModel } from './category/category';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'FormCategories');
  }

  saveCategory(categoryRequestModel: CategoryRequestModel) {
    return this.http.post(environment.apiUrl + 'FormCategories', categoryRequestModel)
      .subscribe(() => this.getCategories());
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  onCategoriesChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.onCategoriesChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTemplateCategories()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getTemplateCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + 'CustomCategoryConfig')
        .subscribe((categories: any) => {
          this.onCategoriesChanged.next(categories)
          resolve(categories);
        }, reject);
    });
  }
}

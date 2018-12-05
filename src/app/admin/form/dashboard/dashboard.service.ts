import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  onCategoriesChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.onCategoriesChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
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

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + 'FormCategory/Categories')
        .subscribe((categories: any) => {
          this.onCategoriesChanged.next(categories)
          resolve(categories);
        }, reject);
    });
  }
}

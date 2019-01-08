import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PagedResult } from 'app/models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {
  assessmentsResult: PagedResult;
  onAssessmentChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onAssessmentChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAssessments(1, 10)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getAssessments(page?: number, size?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      page = page === undefined ? 1 : page;
      size = size === undefined ? 10 : size;
      this._httpClient.get<PagedResult>(environment.apiUrl + 'Assessment?page=' + page + '&pageSize=' + size)
        .subscribe(
          (response: PagedResult) => {
            this.assessmentsResult = response;
            this.onAssessmentChanged.next(this.assessmentsResult);
            resolve(response);
          }, reject);
    }
    );
  }

  // getAssessmentList(page?: number, size?: number): Observable<any> {
  //   return this._httpClient.get<PagedResult>(environment.apiUrl + 'Assessment?page=' + page + '&pageSize=' + size)
  // }
}

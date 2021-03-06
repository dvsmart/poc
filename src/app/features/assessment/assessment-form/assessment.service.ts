import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Assessment } from '../models/assessment.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReferenceModel } from '../models/reference.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  routeParams: any;
  assessment: any;
  onAssessmentChanged: BehaviorSubject<any>;

  referenceApi = environment.apiUrl + 'AssessmentReference/';

  constructor(
    private _httpClient: HttpClient
  ) {
    this.onAssessmentChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAssessment()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  public getscopes(): Observable<ReferenceModel[]> {
    return this._httpClient.get<ReferenceModel[]>(this.referenceApi + 'Scopes');
  }
  public getTypes(): Observable<ReferenceModel[]> {
    return this._httpClient.get<ReferenceModel[]>(this.referenceApi + 'Types');
  }
  public getFrequencies(): Observable<ReferenceModel[]> {
    return this._httpClient.get<ReferenceModel[]>(this.referenceApi + 'Frequencies');
  }

  getAssessment(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onAssessmentChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get<Assessment>(environment.apiUrl + 'Assessment/' + this.routeParams.id)
          .subscribe((response: Assessment) => {
            this.assessment = response;
            this.onAssessmentChanged.next(this.assessment);
            resolve(response);
          }, reject);
      }
    });
  }


  updateAssessment(assessmentModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Assessment', { ...assessmentModel })
        .subscribe(response => {
          resolve(response);
        }, reject);
    });
  }

  addAssessment(assessmentModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Assessment', { ...assessmentModel })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

}

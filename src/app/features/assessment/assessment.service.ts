import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FuseUtils } from '@core/utils';
import { environment } from 'environments/environment';
import { ReferenceModel } from './models/reference.model';
import { Assessment } from './models/assessment.model';
import { DeleteModel } from '@core/types/deleteModel';


@Injectable({
    providedIn: 'root'
})
export class AssessmentService {
    onAssessmentsChanged: BehaviorSubject<any>;
    onSelectedAssessmentsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    dataLength: BehaviorSubject<number>;

    apiResponse: any;
    assessments: any[];
    selectedAssessments: string[] = [];
    searchText: string;
    filterBy: string;

    referenceApi = environment.apiUrl + 'AssessmentReference/'

    constructor(
        private _httpClient: HttpClient
    ) {
        this.onAssessmentsChanged = new BehaviorSubject([]);
        this.onSelectedAssessmentsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.dataLength = new BehaviorSubject(0);
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

    public add(propertyModel: Assessment): Observable<boolean> {
        return this._httpClient.post<boolean>(environment.apiUrl + 'Assessment/create', propertyModel);
    }

    public update(id: number, propertyModel: Assessment): Observable<boolean> {
        return this._httpClient.put<boolean>(environment.apiUrl + 'Assessment?id=' + id, propertyModel);
    }

    public getSingle(id: number): Observable<Assessment> {
        return this._httpClient.get<Assessment>(environment.apiUrl + 'Assessment/' + id);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAssessments(),
                this.getFrequencies(),
                this.getscopes(),
                this.getTypes()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getAssessments();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getAssessments();
                    });

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
            this._httpClient.get(environment.apiUrl + 'Assessment?page=' + page + '&pageSize=' + size)
                .subscribe((response: any) => {
                    this.apiResponse = response;
                    this.dataLength = response.totalCount;
                    if (this.searchText && this.searchText !== '') {
                        this.assessments = FuseUtils.filterArrayByString(this.apiResponse.data, this.searchText);
                    }
                    this.onAssessmentsChanged.next(this.apiResponse.data);
                    resolve(this.assessments);
                }, reject);
        }
        );
    }

    toggleSelectedAssessment(id): void {
        if (this.selectedAssessments.length > 0) {
            const index = this.selectedAssessments.indexOf(id);
            if (index !== -1) {
                this.selectedAssessments.splice(index, 1);
                this.onSelectedAssessmentsChanged.next(this.selectedAssessments);
                return;
            }
        }
        this.selectedAssessments.push(id);
        this.onSelectedAssessmentsChanged.next(this.selectedAssessments);
    }

    toggleSelectAll(): void {
        if (this.selectedAssessments.length > 0) {
            this.deselectAssessments();
        }
        else {
            this.selectAssessments();
        }
    }

    selectAssessments(filterParameter?, filterValue?): void {
        this.selectedAssessments = [];
        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedAssessments = [];
            this.assessments.map(property => {
                this.selectedAssessments.push(property.id.toString());
            });
        }
        // Trigger the next event
        this.onSelectedAssessmentsChanged.next(this.selectedAssessments);
    }

    updateAssessment(assessment): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('/api/Assessment/edit' + assessment.id, { ...assessment })
                .subscribe(response => {
                    this.getAssessments();
                    resolve(response);
                });
        });
    }

    deselectAssessments(): void {
        this.selectedAssessments = [];

        // Trigger the next event
        this.onSelectedAssessmentsChanged.next(this.selectedAssessments);
    }

    deleteAssessments(assessmentId): void {
        this._httpClient.delete(environment.apiUrl + 'Assessment?recordId=' + assessmentId).subscribe(x => {
            this.getAssessments()
        });
    }

    deleteSelectedAssessments(): void {
        let model = new DeleteModel();
        model.ids = [];
        this.selectedAssessments.forEach(element => {
            model.ids.push(element);
        });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        this._httpClient.post(environment.apiUrl + 'Assessment/deleteAll', model, { headers: headers }).subscribe(x => this.getAssessments());
        this.deselectAssessments();
    }

}

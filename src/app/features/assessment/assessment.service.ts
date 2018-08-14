import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FuseUtils } from '@core/utils';
import { environment } from 'environments/environment';
import { ReferenceModel } from './models/reference.model';
import { Assessment } from './models/assessment.model';

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
        return this._httpClient.put<boolean>(environment.apiUrl + 'Assessment/edit/?id=' + id, propertyModel);
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

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedContact(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedAssessments.length > 0) {
            const index = this.selectedAssessments.indexOf(id);

            if (index !== -1) {
                this.selectedAssessments.splice(index, 1);

                // Trigger the next event
                this.onSelectedAssessmentsChanged.next(this.selectedAssessments);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedAssessments.push(id);

        // Trigger the next event
        this.onSelectedAssessmentsChanged.next(this.selectedAssessments);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedAssessments.length > 0) {
            this.deselectAssessments();
        }
        else {
            this.selectAssessments();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
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

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/contacts-contacts/' + contact.id, { ...contact })
                .subscribe(response => {
                    this.getAssessments();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    // updateUserData(userData): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.post('api/contacts-user/' + this.user.id, {...userData})
    //             .subscribe(response => {
    //                 this.getProperties();
    //                 resolve(response);
    //             });
    //     });
    // }

    /**
     * Deselect contacts
     */
    deselectAssessments(): void {
        this.selectedAssessments = [];

        // Trigger the next event
        this.onSelectedAssessmentsChanged.next(this.selectedAssessments);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteAssessments(contact): void {
        const contactIndex = this.assessments.indexOf(contact);
        this.assessments.splice(contactIndex, 1);
        this.onAssessmentsChanged.next(this.assessments);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedAssessments(): void {
        for (const propertyId of this.selectedAssessments) {
            const contact = this.assessments.find(_property => {
                return _property.id.toString() === propertyId;
            });
            const contactIndex = this.assessments.indexOf(contact);
            this.assessments.splice(contactIndex, 1);
        }
        this.onAssessmentsChanged.next(this.assessments);
        this.deselectAssessments();
    }

}

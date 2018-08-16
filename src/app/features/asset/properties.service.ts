import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { FuseUtils } from '@core/utils';
import { CreateAssetPropertyRequest } from './models/createPropertyRequestModel';

@Injectable({
    providedIn: 'root'
})
export class PropertiesService {
    onPropertiesChanged: BehaviorSubject<any>;
    onSelectedPropertiesChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    dataLength: BehaviorSubject<number>;

    apiResponse: any;
    properties: any[];
    selectedProperties: string[] = [];
    searchText: string;
    filterBy: string;

    api = environment.apiUrl + 'AssetProperties/create';

    close: BehaviorSubject<boolean>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onPropertiesChanged = new BehaviorSubject([]);
        this.onSelectedPropertiesChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.dataLength = new BehaviorSubject(0);
        this.close  = new BehaviorSubject(false);
    }

   closeForm(){
       this.close.next(true);
   }

   isClosed(){
       return this.close.asObservable();
   }
  

  public add(propertyModel: CreateAssetPropertyRequest): Observable<boolean> {
    return this._httpClient.post<boolean>(environment.apiUrl + 'AssetProperties/create', propertyModel);
  }

  public update(id: number, propertyModel: CreateAssetPropertyRequest): Observable<boolean> {
    return this._httpClient.put<boolean>(environment.apiUrl + 'AssetProperties/edit/?id=' + id, propertyModel);
  }

  public getSingle(id: number): Observable<CreateAssetPropertyRequest> {
    return this._httpClient.get<CreateAssetPropertyRequest>(environment.apiUrl + 'AssetProperties/' + id);
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProperties(),
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getProperties();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getProperties();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getProperties(page?: number, size?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            page = page === undefined ? 1 : page;
            size = size === undefined ? 10 : size;
            this._httpClient.get(environment.apiUrl + 'AssetProperties?page=' + page + '&pageSize=' + size)
                .subscribe((response: any) => {
                    this.apiResponse = response;
                    this.dataLength = response.totalCount;
                    if (this.searchText && this.searchText !== '') {
                        this.properties = FuseUtils.filterArrayByString(this.apiResponse.data, this.searchText);
                    }
                    this.onPropertiesChanged.next(this.apiResponse.data);
                    resolve(this.properties);
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
        if (this.selectedProperties.length > 0) {
            const index = this.selectedProperties.indexOf(id);

            if (index !== -1) {
                this.selectedProperties.splice(index, 1);

                // Trigger the next event
                this.onSelectedPropertiesChanged.next(this.selectedProperties);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedProperties.push(id);

        // Trigger the next event
        this.onSelectedPropertiesChanged.next(this.selectedProperties);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedProperties.length > 0) {
            this.deselectProperties();
        }
        else {
            this.selectProperties();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectProperties(filterParameter?, filterValue?): void {

        this.selectedProperties = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedProperties = [];
            this.properties.map(property => {
                this.selectedProperties.push(property.id.toString());
            });
        }

        // Trigger the next event
        this.onSelectedPropertiesChanged.next(this.selectedProperties);
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
                    this.getProperties();
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
    deselectProperties(): void {
        this.selectedProperties = [];

        // Trigger the next event
        this.onSelectedPropertiesChanged.next(this.selectedProperties);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteProperties(contact): void {
        const contactIndex = this.properties.indexOf(contact);
        this.properties.splice(contactIndex, 1);
        this.onPropertiesChanged.next(this.properties);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedProperties(): void {
        for (const propertyId of this.selectedProperties) {
            const contact = this.properties.find(_property => {
                return _property.id.toString() === propertyId;
            });
            const contactIndex = this.properties.indexOf(contact);
            this.properties.splice(contactIndex, 1);
        }
        this.onPropertiesChanged.next(this.properties);
        this.deselectProperties();
    }

}

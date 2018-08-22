import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { FuseUtils } from '@core/utils';
import { CreateAssetPropertyRequest } from './models/createPropertyRequestModel';
import { DeleteModel } from '@core/types/deleteModel';

@Injectable({
    providedIn: 'root'
})
export class PropertiesService {
    onPropertiesChanged: BehaviorSubject<any>;
    onSelectedPropertiesChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    dataLength: BehaviorSubject<number>;
    pageSize: BehaviorSubject<number>;

    apiResponse: any;
    properties: any[];
    selectedProperties: string[] = [];
    searchText: string;
    filterBy: string;

    api = environment.apiUrl + 'AssetProperties/create';

    constructor(
        private _httpClient: HttpClient
    ) {
        this.onPropertiesChanged = new BehaviorSubject([]);
        this.onSelectedPropertiesChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.dataLength = new BehaviorSubject(0);
        this.pageSize = new BehaviorSubject(0);
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
                    this.pageSize = response.pageSize;
                    if (this.searchText && this.searchText !== '') {
                        this.properties = FuseUtils.filterArrayByString(this.apiResponse.data, this.searchText);
                    }
                    this.onPropertiesChanged.next(this.apiResponse.data);
                    resolve(this.properties);
                }, reject);
        }
        );
    }

    toggleSelectedProperty(id): void {
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

    toggleSelectAll(): void {
        if (this.selectedProperties.length > 0) {
            this.deselectProperties();
        }
        else {
            this.selectProperties();
        }
    }

    selectProperties(filterParameter?, filterValue?): void {
        this.selectedProperties = [];
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedProperties = [];
            this.properties.map(property => {
                this.selectedProperties.push(property.id.toString());
            });
        }
        this.onSelectedPropertiesChanged.next(this.selectedProperties);
    }

    updateProperty(propertyModel: CreateAssetPropertyRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(environment.apiUrl + 'AssetProperties' , { ...propertyModel })
                .subscribe(response => {
                    this.getProperties();
                    resolve(response);
                });
        });
    }

    addProperty(propertyModel: CreateAssetPropertyRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiUrl + 'AssetProperties' , { ...propertyModel })
                .subscribe(response => {
                    this.getProperties();
                    resolve(response);
                });
        });
    }
    

    deselectProperties(): void {
        this.selectedProperties = [];
        this.onSelectedPropertiesChanged.next(this.selectedProperties);
    }

    deleteProperties(propertyId): void {
        this._httpClient.delete(environment.apiUrl + 'AssetProperties/' + propertyId).subscribe(x=> this.getProperties());
    }

    deleteSelectedProperties(selectedProperties): void {
        let model = new DeleteModel();
        model.ids = [];
        selectedProperties.forEach(element => {
            model.ids.push(element);
        });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        this._httpClient.post(environment.apiUrl + 'AssetProperties/deleteAll',model,{ headers: headers }).subscribe(x=> this.getProperties());
        this.deselectProperties();
    }
}



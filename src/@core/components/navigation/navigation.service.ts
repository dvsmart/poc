import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoreNavigationService {
    onItemCollapsed: Subject<any>;
    onItemCollapseToggled: Subject<any>;
    onMenuItemsChanged:BehaviorSubject<any>;
    // Private
    private _onNavigationChanged: BehaviorSubject<any>;
    private _onNavigationRegistered: BehaviorSubject<any>;
    private _onNavigationUnregistered: BehaviorSubject<any>;

    private _currentNavigationKey: string;
    private _registry: { [key: string]: any } = {};

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
        // Set the defaults
        this.onItemCollapsed = new Subject();
        this.onItemCollapseToggled = new Subject();

        // Set the private defaults
        this._currentNavigationKey = null;
        this._onNavigationChanged = new BehaviorSubject(null);
        this._onNavigationRegistered = new BehaviorSubject(null);
        this._onNavigationUnregistered = new BehaviorSubject(null);
        this.onMenuItemsChanged = new BehaviorSubject({});
    }

    getMenu(): Observable<any> {
        return this.http.get<any>(environment.apiUrl + 'Menu');
    }

    getMenuItems(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(environment.apiUrl + 'Menu')
                .subscribe(response => {
                    this.onMenuItemsChanged.next(response);
                    resolve(response);
                }, reject);
        }
        );
    }

    register(key, navigation): void {
        if (this._registry[key]) {
            console.error(`The navigation with the key '${key}' already exists. Either unregister it first or use a unique key.`);

            return;
        }

        this._registry[key] = navigation;

        // Notify the subject
        this._onNavigationRegistered.next([key, navigation]);
    }
}
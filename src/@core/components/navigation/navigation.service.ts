import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root'
})
export class CoreNavigationService {
    onItemCollapsed: Subject<any>;
    onItemCollapseToggled: Subject<any>;

    // Private
    private _onNavigationChanged: BehaviorSubject<any>;
    private _onNavigationRegistered: BehaviorSubject<any>;
    private _onNavigationUnregistered: BehaviorSubject<any>;

    private _onNavigationItemAdded: BehaviorSubject<any>;
    private _onNavigationItemUpdated: BehaviorSubject<any>;
    private _onNavigationItemRemoved: BehaviorSubject<any>;

    private _currentNavigationKey: string;
    private _registry: { [key: string]: any } = {};

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {

        this.onItemCollapsed = new Subject();
        this.onItemCollapseToggled = new Subject();

        // Set the private defaults
        this._currentNavigationKey = null;
        this._onNavigationChanged = new BehaviorSubject(null);
        this._onNavigationRegistered = new BehaviorSubject(null);
        this._onNavigationUnregistered = new BehaviorSubject(null);
    }

    getNavigationItems(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(environment.apiUrl + 'Menu')
                .subscribe((response: any) => {
                    localStorage.setItem('menu', JSON.stringify(response));
                    this.register('main', response);
                    this.setCurrentNavigation('main');
                    resolve(response);
                }, reject);
        });
    }

    getMenuItems() {
        debugger;
        if (localStorage.getItem('menu') == "") {
            this.getNavigationItems();
        } else {
            var menu = localStorage.get('menu');
            this.register('main', JSON.parse(menu));
            this.setCurrentNavigation('main');
        }
    }

    addNavItemWithCustomFunction() {
        // Prepare the new nav item
        const newNavItem = {
            id: 'end',
            title: 'Log Out',
            type: 'item',
            function: () => {
                alert('Custom function!');
            }
        };

        // Add the new nav item at the beginning of the navigation
        this.addNavigationItem(newNavItem, newNavItem.id);
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

    setCurrentNavigation(key): void {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        // Set the current navigation key
        this._currentNavigationKey = key;

        // Notify the subject
        this._onNavigationChanged.next(key);
    }

    addNavigationItem(item, id): void {
        // Get the current navigation
        const navigation: any[] = this.getCurrentNavigation();

        // Add to the end of the navigation
        if (id === 'end') {
            navigation.push(item);

            return;
        }

        // Add to the start of the navigation
        if (id === 'start') {
            navigation.unshift(item);
        }

        // Add it to a specific location
        const parent: any = this.getNavigationItem(id);

        if (parent) {
            // Check if parent has a children entry,
            // and add it if it doesn't
            if (!parent.children) {
                parent.children = [];
            }

            // Add the item
            parent.children.push(item);
        }

        // Trigger the observable
        this._onNavigationItemAdded.next(true);
    }

    getNavigationItem(id, navigation = null): any | boolean {
        if (!navigation) {
            navigation = this.getCurrentNavigation();
        }

        for (const item of navigation) {
            if (item.id === id) {
                return item;
            }

            if (item.children) {
                const childItem = this.getNavigationItem(id, item.children);

                if (childItem) {
                    return childItem;
                }
            }
        }

        return false;
    }

    /**
     * Get the parent of the navigation item
     * with the id
     *
     * @param id
     * @param {any} navigation
     * @param parent
     */
    getNavigationItemParent(id, navigation = null, parent = null): any {
        if (!navigation) {
            navigation = this.getCurrentNavigation();
            parent = navigation;
        }

        for (const item of navigation) {
            if (item.id === id) {
                return parent;
            }

            if (item.children) {
                const childItem = this.getNavigationItemParent(id, item.children, item);

                if (childItem) {
                    return childItem;
                }
            }
        }

        return false;
    }

    /**
     * Get onNavigationItemAdded
     *
     * @returns {Observable<any>}
     */
    get onNavigationItemAdded(): Observable<any> {
        return this._onNavigationItemAdded.asObservable();
    }

    /**
     * Get onNavigationItemUpdated
     *
     * @returns {Observable<any>}
     */
    get onNavigationItemUpdated(): Observable<any> {
        return this._onNavigationItemUpdated.asObservable();
    }

    /**
     * Get onNavigationItemRemoved
     *
     * @returns {Observable<any>}
     */
    get onNavigationItemRemoved(): Observable<any> {
        return this._onNavigationItemRemoved.asObservable();
    }

    get onNavigationChanged(): Observable<any> {
        return this._onNavigationChanged.asObservable();
    }

    getCurrentNavigation(): any {
        if (!this._currentNavigationKey) {
            //console.warn(`The current navigation is not set.`);
            return;
        }

        return this.getNavigation(this._currentNavigationKey);
    }

    getNavigation(key): any {
        // Check if the navigation exists
        if (!this._registry[key]) {
            //console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        // Return the sidebar
        return this._registry[key];
    }
}
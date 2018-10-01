import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { MenuItemModel, MenuItem } from '../../model/menu.model';
import { CoreNavigationService } from '@core/components/navigation/navigation.service';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  routeParams: any;
  menuItem: any;
  menuGroupChanged: BehaviorSubject<any>;
  onMenuItemChanged: BehaviorSubject<any>;
  menuParentChanged: BehaviorSubject<any>;
  parentMenuItems: MenuItem[];

  constructor(
    private _httpClient: HttpClient,
    private _navigationService: FuseSidebarService
  ) {
    this.onMenuItemChanged = new BehaviorSubject({});
    this.menuGroupChanged = new BehaviorSubject({});
    this.menuParentChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getMenuItem(),
        this.getMenuGroup(),
        this.getParentMenuItems()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getMenuGroup() {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'MenuGroup')
        .subscribe(response => {
          this.menuGroupChanged.next(response);
          resolve(response);
        }, reject);
    }
    );
  }

  getMenuItem(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onMenuItemChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get<any>(environment.apiUrl + 'Menu/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.menuItem = response;
            this.onMenuItemChanged.next(this.menuItem);
            resolve(response);
          }, reject);
      }
    });
  }

  getParentMenuItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'MenuItem')
        .subscribe(response => {
          response = response.filter(x=> x.hasChildren === true && x.type === 'collapsable');
          this.parentMenuItems = response.map(item => {
            return new MenuItem(item);
          });
          this.menuParentChanged.next(this.parentMenuItems);
          resolve(this.parentMenuItems);
        }, reject);
    }
    );
  }

  updateMenu(menuItem: MenuItemModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(environment.apiUrl + 'Menu', { ...menuItem })
        .subscribe((response: any) => {
          this.onMenuItemChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

  addMenu(menuItem: MenuItemModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(environment.apiUrl + 'Menu', { ...menuItem })
        .subscribe((response: any) => {
          this.onMenuItemChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
 
}

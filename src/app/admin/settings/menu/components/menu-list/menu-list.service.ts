import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '@env/environment';
import { MenuItemModel } from '../../model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  menuList: any[];
  onMenuItemsChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.onMenuItemsChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getMenuItems()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getMenuItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(environment.apiUrl + 'MenuItem')
        .subscribe(response => {
          this.menuList = response;
          this.onMenuItemsChanged.next(this.menuList);
          resolve(this.menuList);
        }, reject);
    }
    );
  }
}
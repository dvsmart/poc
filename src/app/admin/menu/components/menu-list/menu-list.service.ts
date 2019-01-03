import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  onMenuItemsChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) {
    this.onMenuItemsChanged = new BehaviorSubject({});
  }

  resolve(): Observable<any> | Promise<any> | any {
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
      this._httpClient.get<any>(`${environment.apiUrl}menu/all`)
        .subscribe(response => {
          this.onMenuItemsChanged.next(response);
          resolve(response);
        }, reject);
    }
    );
  }

  deleteMenuItem(id:number):Promise<any>{
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.apiUrl}menu?id=${id}`)
        .subscribe(response => {
          this.getMenuItems();
          resolve(response);
        }, reject);
    });
  }
}

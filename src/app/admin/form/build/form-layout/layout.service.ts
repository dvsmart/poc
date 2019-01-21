import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  fieldSetting: BehaviorSubject<any>;
  constructor(private _http: HttpClient) {
    this.fieldSetting = new BehaviorSubject<any>({});
  }

  getFieldTypes(typeId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<any>(environment.apiUrl + 'FieldTypes/' + typeId)
        .subscribe((response: any) => {
          debugger;
          this.fieldSetting.next(response);
          resolve(response);
        }, reject);
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _http: HttpClient) { }

  getFieldTypeSetting(typeId: number) {
    return this._http.get<any>(environment.apiUrl + 'FieldTypes/' + typeId);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private _httpClient: HttpClient) { }

  getField(id?: number): Observable<any> {
    return this._httpClient.get<any>(environment.apiUrl + 'FormFields?id=' + id);
  }
}

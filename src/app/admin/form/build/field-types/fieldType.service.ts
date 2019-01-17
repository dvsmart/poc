import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class FieldTypeService {

    constructor(private http: HttpClient) { }

    fieldTypes() {
        return this.http.get<any>(environment.apiUrl + 'FieldTypes');
    }
}
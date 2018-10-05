import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FieldType } from '../models/fieldtype.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomFieldService {
  fieldTypes: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.fieldTypes = new BehaviorSubject<FieldType>(null);
  }

  getFieldTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<FieldType[]>(environment.apiUrl + 'FormControlsType')
        .subscribe((response: FieldType[]) => {
          this.fieldTypes.next(response);
          resolve(response);
        }, reject);
    });
  }
  
}

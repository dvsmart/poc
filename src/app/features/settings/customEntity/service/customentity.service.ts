import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomentityService {

  constructor(private http:HttpClient) { }

  getGroups(){
    return this.http.get<Group[]>(environment.apiUrl + 'Management');
  }
}

export interface Field {
  fieldId: number;
  caption: string;
}

export interface Tab {
  tabId: number;
  tabName: string;
  fields: Field[];
}

export interface Template {
  templateId: number;
  templateName: string;
  tabs: Tab[];
}

export interface Group {
  groupId: number;
  name: string;
  templates: Template[];
}

export class Entity {
  groups: Group[];
}
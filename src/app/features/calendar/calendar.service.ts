import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable,  BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { EventModel, CalendarEventModel } from './event.model';

@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: BehaviorSubject<any>;
    constructor(private _httpClient: HttpClient){
        this.onEventsUpdated = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.apiUrl + 'Event?page=1&pageSize=50')
                .subscribe((response: any) => {
                    this.events = response.data;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    getEvent(id:number): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.apiUrl + 'Event/GetEventById/' +  id)
                .subscribe((response: EventModel) => {
                    resolve(response);
                }, reject);
        });
    }

    updateEvent(event): Promise<any>
    {
        var eventModel = new EventModel(event);
        return new Promise((resolve, reject) => {
            this._httpClient.put(environment.apiUrl + 'Event?id=' + event.id, eventModel)
                .subscribe((response: any) => {
                    if(response.saveSuccessful){
                        this.getEvents();
                    }
                    resolve();
                }, reject);
        });
    }

    AddEvent(event): Promise<any>
    {
        var eventModel = new EventModel(event);
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.apiUrl + 'Event', eventModel)
                .subscribe((response: any) => {
                    if(response.saveSuccessful){
                        this.getEvents();
                    }
                    resolve();
                }, reject);
        });
    }

    DeleteEvent(id: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(environment.apiUrl + 'Event?id=' + id)
                .subscribe((response: any) => {
                    this.getEvents();
                    resolve();
                }, reject);
        });
    }

}

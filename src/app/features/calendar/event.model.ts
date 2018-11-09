import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { Time } from '@angular/common';

export class CalendarEventModel {
    id: number;
    start: Date;
    end?: Date;
    title: string;
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    location:string;
    description: string;
    isCompleted?: boolean;
    recurrenceTypeId: number;

    constructor(data?) {
        data = data || {};
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.title = data.title || '';
        this.draggable = data.draggable || true;
        this.actions = data.actions || [];
        this.allDay = data.allDayEvent || false;
        this.cssClass = data.cssClass || '';
        this.id = data.id;
        this.isCompleted = data.isCompleted;
        this.recurrenceTypeId = data.recurrenceTypeId;
        this.location = data.location;
        this.description = data.description;
    }
}


export class EventModel {
    title: string;
    description: string;
    location: string;
    start: Date | string;
    end: Date | string;
    recurrenceTypeId: number;
    allDayEvent: boolean;
    isCompleted: boolean;
    recurrenceType: string;
    id: number;
    addedDate?: Date;
    modifiedDate?: Date;

    constructor(data) {
        this.id = data.id || 0;
        this.description = data.description;
        this.allDayEvent = data.allDay;
        this.isCompleted = data.isCompleted;
        this.start = data.start;
        this.end = data.end;
        this.recurrenceTypeId = data.recurrenceTypeId;
        this.location = data.location;
        this.title = data.title;
    }
}
import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export class CalendarEventModel {
    id: number;
    start: Date;
    end?: Date;
    title: string;
    color: {
        primary: string;
        secondary: string;
    };
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        location: string,
        notes: string
    };
    isCompleted?: boolean;
    recurrenceTypeId: number;

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?) {
        data = data || {};
        this.start = new Date(data.startDate);
        this.end = new Date(data.dueDate);
        this.title = data.title || '';
        this.color = {
            primary: data.color && data.color.primary || '#1e90ff',
            secondary: data.color && data.color.secondary || '#D1E8FF'
        };
        this.draggable = data.draggable || true;
        this.resizable = {
            beforeStart: data.resizable && data.resizable.beforeStart || true,
            afterEnd: data.resizable && data.resizable.afterEnd || true
        };
        this.actions = data.actions || [];
        this.allDay = data.allDayEvent || false;
        this.cssClass = data.cssClass || '';
        this.meta = {
            location: data.location || '',
            notes: data.description || ''
        };
        this.id = data.id;
        this.isCompleted = data.isCompleted;
        this.recurrenceTypeId = data.recurrenceTypeId
    }
}


export class EventModel {
    title: string;
    description: string;
    location: string;
    startDate: Date | string;
    dueDate: Date | string;
    recurrenceTypeId: number;
    allDayEvent: boolean;
    isCompleted: boolean;
    recurrenceType: string;
    id: number;
    addedDate?: Date;
    modifiedDate?: Date;

    constructor(data) {
        this.id = data.id || 0;
        this.description = data.meta.notes;
        this.allDayEvent = data.allDay;
        this.isCompleted = data.isCompleted;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.recurrenceTypeId = data.recurrenceTypeId;
        this.location = data.meta.location;
        this.title = data.title;
    }
}
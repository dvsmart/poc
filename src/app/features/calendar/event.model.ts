import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export class CalendarEventModel {
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

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?) {
        data = data || {};
        this.start = new Date(data.startDate) || startOfDay(new Date());
        this.end = new Date(data.dueDate) || endOfDay(new Date());
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
    }
}


export class EventModel {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    dueDate: Date;
    recurrenceTypeId: number;
    allDayEvent: boolean;
    isCompleted: boolean;
    recurrenceType: string;
    id: number;
    addedDate?: Date;
    modifiedDate?: Date;
}
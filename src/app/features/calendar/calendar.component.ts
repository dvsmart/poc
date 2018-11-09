import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { fuseAnimations } from '@core/animations';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { CalendarService } from './calendar.service';
import { CalendarEventModel, EventModel } from './event.model';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: MatDialogRef<CalendarEventFormDialogComponent>;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    event: CalendarEvent;

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService
    ) {
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        this.actions = [
            {
                label: '<i class="material-icons s-16">edit</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label: '<i class="material-icons s-16">delete</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        this.setEvents();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        /**
         * Watch re-render-refresh for updating db
         */
        this.refresh.subscribe(actiontype => {
            switch (actiontype) {
                case 'new':
                    this._calendarService.AddEvent(this.event);
                    break;
                case 'edit':
                    this._calendarService.updateEvent(this.event);
                    break;
                case 'delete':
                    this._calendarService.DeleteEvent(this.event.id);
                    break;
                default:
                    break;
            }
        });

        this._calendarService.onEventsUpdated.subscribe(events => {
            this.setEvents();
            this.refresh.next();
        });
    }

    setEvents(): void {
        this.events = this._calendarService.events.map(item => {
            item.actions = this.actions;
            return new CalendarEventModel(item);
        });
    }

    beforeMonthViewRender({ header, body }): void {
        // console.info('beforeMonthViewRender');
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selectedday style
             * @type {string}
             */
            _selectedDay.cssClass = 'mat-elevation-z3';
        }

    }

    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        // console.warn('Dropped or resized', event);
        this.refresh.next(true);
    }

    deleteEvent(event): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.event = event;
                this.refresh.next('delete');
            }
            this.confirmDialogRef = null;
        });

    }

    editEvent(action: string, event: any): void {
        this._calendarService.getEvent(event.id).then(event => {
            this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
                panelClass: 'event-form-dialog',
                data: {
                    event: event,
                    action: action
                }
            });
            this.dialogRef.afterClosed()
                .subscribe(response => {
                    if (!response) {
                        return;
                    }
                    const actionType: string = response[0];
                    const formData: FormGroup = response[1];
                    switch (actionType) {
                        case 'save':
                            this.event = formData.getRawValue();
                            this.refresh.next('edit');
                            break;
                        case 'delete':
                            this.deleteEvent(event);
                            this.refresh.next('delete');
                            break;
                    }
                });
        })
    }

    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const newEvent = response.getRawValue();
                var startDate = this.getAsDate(newEvent.startDate, newEvent.startTime);
                var endDate = this.getAsDate(newEvent.dueDate, newEvent.endTime);
                newEvent.start = startDate;
                newEvent.end = endDate;
                newEvent.actions = this.actions;
                this.event = newEvent;
                this.refresh.next('new');
            });
    }

    getAsDate(day, time) {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "pm" && hours < 12) hours = hours + 12;
        if (AMPM == "am" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        time = sHours + ":" + sMinutes + ":00";
        var d = new Date(day);
        var n = d.toISOString().substring(0, 10);
        var newDate = new Date(n + "T" + time);
        return newDate;
    }
}



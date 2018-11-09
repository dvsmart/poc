import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatColors } from '@core/mat-colors';
import { CalendarEventModel } from '../event.model';


@Component({
    selector: 'calendar-event-form-dialog',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent {
    action: string;
    event: CalendarEventModel;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.event = _data.event;
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = this.event.title;
        }
        else {
            this.dialogTitle = 'New Event';
            this.event = new CalendarEventModel({
                start: _data.date,
                end: _data.date,
            });
        }

        this.eventForm = this.createEventForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(this.event.id),
            title: new FormControl(this.event.title),
            startDate: new FormControl(this.event.start),
            dueDate: new FormControl(this.event.end),
            allDay: new FormControl(this.event.allDay),
            isCompleted: new FormControl(false),
            allDayEvent: new FormControl(false),
            recurrenceTypeId: new FormControl(1),
            startTime: new FormControl(new Date(this.event.start).toTimeString()),
            endTime: new FormControl(new Date(this.event.end).toTimeString()),
            location: new FormControl(this.event.location),
            description: new FormControl(this.event.description)
        });
    }
}

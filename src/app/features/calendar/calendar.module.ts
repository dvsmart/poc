import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

const routes: Routes = [
    {
        path: '**',
        component: CalendarComponent,
        resolve: {
            chat: CalendarService
        }
    }
];

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarEventFormDialogComponent
    ],
    imports: [
        CoreSharedModule,
        ColorPickerModule,
        FuseConfirmDialogModule,
        AngularCalendarModule.forRoot({
            provide   : DateAdapter,
            useFactory: adapterFactory
        }),
        NgxMaterialTimepickerModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    providers: [
        CalendarService,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule {
}

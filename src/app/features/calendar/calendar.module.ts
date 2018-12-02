import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


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

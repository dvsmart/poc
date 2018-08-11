import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { CoreSharedModule } from '@core/core.module';
import { FuseConfirmDialogModule } from '@core/components/confirm-dialog/confirm-dialog.module';

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
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,

        AngularCalendarModule.forRoot(),
        ColorPickerModule,

        CoreSharedModule,
        FuseConfirmDialogModule
    ],
    providers: [
        CalendarService
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule {
}

import { NgModule } from "@angular/core";
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule, MatOptionModule, MatSelectModule, MatStepperModule, MatRadioModule, MatChipsModule, MatRippleModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [
        CoreSidebarModule,
        CdkTableModule,
        MatPaginatorModule,
        MatRadioModule,
        MatStepperModule,
        MatMenuModule,
        MatSortModule,
        MatListModule,
        MatDialogModule,
        MatOptionModule,
        MatCardModule,
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatSlideToggleModule
    ],
    exports: [
        CoreSidebarModule,
        CdkTableModule,
        MatPaginatorModule,
        MatRadioModule,
        MatStepperModule,
        MatMenuModule,
        MatSortModule,
        MatListModule,
        MatDialogModule,
        MatOptionModule,
        MatCardModule,
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatSlideToggleModule
    ]
})
export class MaterialModule { }
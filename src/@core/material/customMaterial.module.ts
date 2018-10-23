import { NgModule } from "@angular/core";
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule, MatOptionModule, MatSelectModule, MatStepperModule, MatRadioModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [
        CdkTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatSortModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatStepperModule,
        MatRadioModule,
        MatProgressBarModule
    ],
    exports: [
        CoreSidebarModule,
        CdkTableModule,
        MatPaginatorModule,
        MatRadioModule,
        MatStepperModule,
        MatMenuModule,
        MatSortModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule,
        MatOptionModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatProgressBarModule
    ]
})
export class MaterialModule { }
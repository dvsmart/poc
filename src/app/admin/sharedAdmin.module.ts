import { NgModule } from "@angular/core";
import { CoreSharedModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components/sidebar/sidebar.module';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [
        CoreSharedModule,
        CoreSidebarModule,
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
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatProgressBarModule
    ],
    exports: [
        CoreSharedModule,
        CoreSidebarModule,
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
        ReactiveFormsModule,
        FormsModule,
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
export class SharedAdminModule { }
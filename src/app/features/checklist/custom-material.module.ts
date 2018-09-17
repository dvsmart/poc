import { NgModule } from '@angular/core';
import { MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatTabsModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatButtonModule, MatToolbarModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatChipsModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  exports: [
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
})
export class CustomMaterialModule { }
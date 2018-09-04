import { NgModule } from '@angular/core';
import { MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatTabsModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatButtonModule, MatToolbarModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  exports:[
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  providers:[{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
})
export class CustomMaterialModule { }
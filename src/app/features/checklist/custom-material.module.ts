import { NgModule } from '@angular/core';
import { MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatTabsModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatButtonModule, MatToolbarModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';

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
    MatProgressSpinnerModule
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
    MatProgressSpinnerModule
  ],
  providers:[{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
})
export class CustomMaterialModule { }
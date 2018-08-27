import { NgModule } from '@angular/core';
import { MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatTabsModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
  ],
  exports:[
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
  ],
  providers:[{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
})
export class CustomMaterialModule { }
import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';


@NgModule({
  declarations: [UploadComponent, UploadDialogComponent],
  imports: [
    CommonModule, MatButtonModule,MatIconModule, MatDialogModule, MatListModule, FlexLayoutModule, HttpClientModule,
     MatProgressBarModule
  ],
  exports: [UploadComponent],
  entryComponents:[UploadDialogComponent]
})
export class UploadModule { }

import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFileUploadModule
  ],
  exports: [UploadComponent]
})
export class UploadModule { }

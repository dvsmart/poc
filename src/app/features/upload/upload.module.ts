import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [UploadComponent]
})
export class UploadModule { }

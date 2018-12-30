import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('file') file: any;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  totalFiles: number;

  progress: Observable<number>;
  public message: string;
  value:any;
  
  public files: Set<File> = new Set();

  sub: Subscription;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>, private uploadService: UploadService) { }

  ngOnInit() {
    this.totalFiles = 0;
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        this.totalFiles++;
      }
    }
  }

  removeFile(key:any){
    this.files.delete(key);
    this.totalFiles--;
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.files.size === 0) {
      this.message = 'Please select a file!!!';
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files);
    
    for (const key in this.progress) {
      this.sub = this.progress[key].progress.subscribe(val => {this.value = val;});
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
      console.log(allProgressObservables);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Upload Finished';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    

    // Hide the cancel-button
    this.showCancelButton = true;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

  ngOnDestroy(){
    this.files.clear();
    this.sub.unsubscribe();
  }

}

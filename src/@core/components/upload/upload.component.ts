import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { UploadService } from './upload.service';
import { FileUploadModel } from './upload';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  
  

  constructor(public dialog: MatDialog) { }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%' });
  }
  ngOnInit() {
    
  }

}

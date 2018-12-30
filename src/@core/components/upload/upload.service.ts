import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { environment } from '@env/environment';
import { map, tap, last, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url: string = environment.apiUrl + 'Documents';
  
  constructor(private http: HttpClient) { }
  

  public upload(files: Set<File>): any {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      this.http.request(req).pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
            const percentDone = Math.round((100 * event.loaded) / event.total);
            // pass the percentage into the progress-stream
            progress.next(percentDone);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        tap(() => { }),
        last(),
        catchError(() => {
          
          return of(`${file.name} upload failed.`);
        })
      ).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            alert(event.body);
          }
        }
      );

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}

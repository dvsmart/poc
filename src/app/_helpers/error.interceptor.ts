import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../login/auth.service';
import { MatSnackBar } from '@angular/material';
import { CoreProgressBarService } from '@core/components/progress-bar/progress-bar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private snackbar: MatSnackBar, private progressBar: CoreProgressBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            debugger;
            switch (err.status) {
                case 401:
                    this.authenticationService.logout();
                    location.reload(true);
                    break;
                case 401:
                    this.snackbar.open(err.statusText, null, { duration: 2000 });
                    this.progressBar.hide();
                    break;
                case 0:
                    this.progressBar.hide();
                    this.snackbar.open("Service Unavailable. Please contact the administrator", null, { duration: 5000 });
                    break;
                default:
                    this.snackbar.open(err.statusText, null, { duration: 2000 });
            }
            const error = err.error != null ? err.error.message : err.message || err.statusText;
            return throwError(error);
        }))
    }
}
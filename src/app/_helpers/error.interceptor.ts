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
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            if (err.status === 404) {
                this.snackbar.open(err.statusText, null, { duration: 2000 });
                this.progressBar.hide();
            }
            if (err.status === 0 && err.statusText === 'Unknown Error') {
                this.progressBar.hide();
                this.snackbar.open("Service Unavailable. Please contact the administrator", null, { duration: 5000 });
                return;
            }
            this.snackbar.open(err.statusText, null, { duration: 2000 });
            const error = err.error != null ? err.error.message : err.message || err.statusText;
            return throwError(error);
        }))
    }
}
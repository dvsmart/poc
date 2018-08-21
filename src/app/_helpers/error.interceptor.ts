import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../login/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.error.message || err.statusText;
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            if (err.status === 400) {
                console.log(error)
            }
            return of(error);
        }))
    }
}
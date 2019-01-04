import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = sessionStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request)
            .catch((error, caught) => {
                debugger;
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        location.reload(true);
                    }
                }
                return Observable.throw(error);
            }) as any;
    }
}
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = localStorage.getItem('currentUser') != null ? JSON.parse(localStorage.getItem('currentUser')) : null;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request)
            .catch((error, caught) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        //this.router.navigate(['account/login'], { queryParams: { returnUrl: this.state.url } });
                    }
                }
                return Observable.throw(error);
            }) as any;
    }
}
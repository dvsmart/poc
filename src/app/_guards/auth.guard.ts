import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../login/auth.service';
import { take, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    authenticated: boolean;
    constructor(private router: Router, private authservice: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.authservice.authenticated) {
            localStorage.removeItem('menu');
            this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    }

}

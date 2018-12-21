import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../login/auth.service';
import { take, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    authenticated: boolean;
    constructor(private router: Router, private authservice: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(this.authservice.authenticated){
            return true;
        }
        return false;
    }

}

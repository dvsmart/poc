import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { AuthService } from './auth.service';
import { FuseConfigService } from '@core/services/config.service';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { UserIdleService } from './timeout/idle.service';
import { pipe, Subject } from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    error: string;
    loading: boolean;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authservice: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private userIdle: UserIdleService
    ) {
        this._unsubscribeAll = new Subject();
        if (this.authservice.authenticated) {
            this.router.navigate(['/']);
        }

    }

    ngOnInit(): void {
        this.authservice.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

    }

    onLogin() {
        if (this.loginForm.invalid) {
            this.error = 'Username & password are required.'
            return;
        }
        this.loading = true;
        this.authservice.authenticate(this.loginForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                //this.userIdle.startWatching();
            },
            error => {
                this.error = error;
                this.loading = false;
            });

    }

    ngOnDestroy(){
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}

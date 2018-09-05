import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { AuthService } from './auth.service';
import { FuseConfigService } from '@core/services/config.service';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { first } from 'rxjs/operators';
import { UserIdleService } from './timeout/idle.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    error:string;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authservice: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private userIdle: UserIdleService
    ) {
        
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
            return;
        }
        this.authservice.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.userIdle.startWatching();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });
    }

}

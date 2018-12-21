import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../login/auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@core/animations';
import { UserIdleService } from 'app/login/timeout/idle.service';

@Component({
    selector: 'app-lock-screen',
    templateUrl: './lock-screen.component.html',
    styleUrls: ['./lock-screen.component.scss'],
    animations:fuseAnimations
})
export class LockScreenComponent implements OnInit {
    lockForm: FormGroup;
    name: string;

    returnUrl: string;
    error: string;
    constructor(
        private _formBuilder: FormBuilder,
        private authservice: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.lockForm = new FormGroup({});
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.name = user != null ? user.username : ''
        this.lockForm = this._formBuilder.group({
            username: [this.name, Validators.required],
            password: ['', Validators.required]
        });
    }

    unlock() {
        if (this.lockForm.invalid) {
            return;
        }
        this.authservice.authenticate(this.lockForm.value).pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
            });
    }
}

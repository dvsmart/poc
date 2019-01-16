import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
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
        var user = localStorage.getItem('currentUser');
        this.name = user != null ? user : ''
        this.lockForm = this._formBuilder.group({
            username: [this.name, { disabled: true }],
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
                    localStorage.removeItem('menu');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });
    }
}

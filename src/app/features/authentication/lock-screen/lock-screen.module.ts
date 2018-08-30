import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { LockScreenComponent } from './lock-screen.component';

const routes = [
    {
        path     : 'auth/lock',
        component: LockScreenComponent
    }
];

@NgModule({
    declarations: [
        LockScreenComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        CoreSharedModule
    ]
})
export class LockModule
{
}

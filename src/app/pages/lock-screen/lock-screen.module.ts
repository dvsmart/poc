import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { LockScreenComponent } from './lock-screen.component';

const routes = [
    {
        path     : '',
        component: LockScreenComponent
    }
];

@NgModule({
    declarations: [
        LockScreenComponent
    ],
    imports     : [
        CoreSharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        RouterModule.forChild(routes),
    ]
})
export class LockModule
{
}

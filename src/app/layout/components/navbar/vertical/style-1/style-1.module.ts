import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';


import { NavbarVerticalStyle1Component } from './style-1.component';
import { CoreSharedModule } from '@core/core.module';
import { CoreNavigationModule } from '@core/components/navigation/navigation.module';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        CoreSharedModule,
        CoreNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module
{
}

import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';


import { NavbarVerticalStyle2Component } from './style-2.component';
import { CoreSharedModule } from '@core/core.module';
import { CoreNavigationModule } from '@core/components/navigation/navigation.module';

@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        CoreSharedModule,
        CoreNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module
{
}

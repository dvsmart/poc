import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { CoreSharedModule } from '@core/core.module';


@NgModule({
    imports     : [
        MatButtonModule,
        MatIconModule,
        CoreSharedModule
    ],
    declarations: [
        GridLayoutComponent
    ],
    exports     : [
        GridLayoutComponent
    ],
    
})
export class GridLayoutModule
{
}
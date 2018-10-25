import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';
import { CoreSharedModule } from '@core/core.module';

@NgModule({
    imports: [
        CoreSharedModule
    ],
    declarations: [
        GridLayoutComponent,
    ],
    exports: [
        GridLayoutComponent
    ],

})
export class GridLayoutModule {
}
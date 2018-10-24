import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FuseDirectivesModule } from '@core/directives/directives';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        FuseDirectivesModule,
        FlexLayoutModule
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
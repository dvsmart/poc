import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@core/directives/directives';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        FuseDirectivesModule
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
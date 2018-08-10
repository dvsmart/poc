import { NgModule } from '@angular/core';
import { FuseIfOnDomDirective } from './core-if-on-dom/core-if-on-dom.directive';
import { FuseInnerScrollDirective } from './core-inner-scroll/core-inner-scroll.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from './core-mat-sidenav/core-mat-sidenav.directive';
import { FusePerfectScrollbarDirective } from './core-perfect-scrollbar/core-perfect-scrollbar.directive';


@NgModule({
    declarations: [
        FuseIfOnDomDirective,
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        FuseIfOnDomDirective,
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective
    ]
})
export class FuseDirectivesModule
{
}

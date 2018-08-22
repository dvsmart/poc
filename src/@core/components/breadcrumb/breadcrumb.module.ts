import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { BreadcrumbsService } from "./breadcrumb.service";


@NgModule({

    declarations: [
        BreadcrumbComponent
    ],
    providers: [
        BreadcrumbsService
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [BreadcrumbComponent]
})
export class BreadcrumbsModule {
    constructor() {}

}
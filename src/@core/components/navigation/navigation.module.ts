import { NgModule } from "../../../../node_modules/@angular/core";
import { CommonModule } from "../../../../node_modules/@angular/common";
import { RouterModule } from "../../../../node_modules/@angular/router";
import { MatIconModule, MatRippleModule } from "../../../../node_modules/@angular/material";
import { CoreNavigationComponent } from "./navigation.component";
import { CoreNavVerticalGroupComponent } from "./vertical/group/group.component";
import { CoreNavVerticalItemComponent } from "./vertical/item/item.component";
import { CoreNavVerticalCollapsableComponent } from "./vertical/collapsable/collapsable.component";

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule
    ],
    exports     : [
        CoreNavigationComponent
    ],
    declarations: [
        CoreNavigationComponent,
        CoreNavVerticalGroupComponent,
        CoreNavVerticalItemComponent,
        CoreNavVerticalCollapsableComponent
    ]
})
export class CoreNavigationModule
{
}
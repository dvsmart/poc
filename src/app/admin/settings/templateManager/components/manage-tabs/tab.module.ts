import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { TabListComponent } from "./tab-list/tab-list.component";
import { TabListItemComponent } from "./tab-list/tab-list-item/tab-list-item.component";
import { TabComponent } from "./tab.component";
import { TabDetailComponent } from "./tab-detail/tab-detail.component";

@NgModule({
    imports: [
      CoreSharedModule,
    ],
    declarations: [
        TabListComponent,
        TabListItemComponent,
        TabComponent,
        TabDetailComponent
    ],
  })
  export class TabModule { }
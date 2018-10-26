import { NgModule } from "@angular/core";
import { CoreSharedModule } from "@core/core.module";
import { FieldListComponent } from "./field-list.component";
import { FieldDetailComponent } from "./field-detail/field-detail.component";


@NgModule({
    imports: [
      CoreSharedModule,
    ],
    declarations: [
        FieldListComponent,
        FieldDetailComponent
    ],
  })
  export class FieldModule { }
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material";
import { DataTableComponent } from "./data-table.component";
import { CdkTableModule } from "@angular/cdk/table";
import { DataTableService } from "./data-table.service";

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        CdkTableModule
    ],
    exports: [
        DataTableComponent
    ],
    declarations: [
        DataTableComponent
    ],
    providers: [DataTableService]
})
export class DataTableModule {
}
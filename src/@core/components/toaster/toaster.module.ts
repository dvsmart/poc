import { NgModule } from '@angular/core';
import { ToasterComponent } from './toaster.component';
import { ToasterService } from './toaster.service';


@NgModule({
    declarations: [
        ToasterComponent
    ],
    exports: [
        ToasterComponent
    ],
    providers: [
        ToasterService
    ]
})
export class ToasterModule { }
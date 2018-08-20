import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster.component';


@NgModule({
    imports: [CommonModule],
    declarations: [
        ToasterComponent
    ],
    exports: [
        ToasterComponent
    ]
})
export class ToasterModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ToasterModule,
            providers: []
        }
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: ToasterModule
        }
    }
}
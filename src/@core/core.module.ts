import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from './directives/directives';
import { FusePipesModule } from './pipes/pipes.module';
import { FUSE_CONFIG } from './services/config.service';
import { ToasterModule } from './components/toaster/toaster.module';
import { ToasterService } from './components/toaster/toaster.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        ToasterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        ToasterModule
    ],
    providers:[ToasterService]
})
export class CoreSharedModule {
    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : CoreSharedModule,
            providers: [
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
 }
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from './directives/directives';
import { FusePipesModule } from './pipes/pipes.module';
import { FUSE_CONFIG } from './services/config.service';
import { MaterialModule } from './material/customMaterial.module';
import { GridLayoutModule } from './components/gridLayout/grid-layout.module';
import { FormLayoutModule } from './components/form-layout/form-layout.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        MaterialModule,
        GridLayoutModule,
        FormLayoutModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        MaterialModule,
        GridLayoutModule,
        FormLayoutModule
    ]
})
export class CoreSharedModule {
    // constructor(@Optional() @SkipSelf() parentModule: CoreSharedModule)
    // {
    //     if ( parentModule )
    //     {
    //         throw new Error('CoreSharedModule is already loaded. Import it in the AppModule only!');
    //     }
    // }

    static forRoot(config): ModuleWithProviders {
        return {
            ngModule: CoreSharedModule,
            providers: [
                {
                    provide: FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
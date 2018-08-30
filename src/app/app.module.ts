import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { MatButtonModule, MatIconModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '../../node_modules/@angular/material';
import { FuseProgressBarModule } from '../@core/components/progress-bar/progress-bar.module';
import { CoreSharedModule } from '../@core/core.module';
import { FuseSidebarModule } from '../@core/components/sidebar/sidebar.module';
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { LayoutModule } from './layout/layout.module';
import { fuseConfig } from './config';
import { FeaturesModule } from './features/features.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule',
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,

    FuseProgressBarModule,

    FuseSidebarModule,

    LayoutModule,
    CoreSharedModule.forRoot(fuseConfig),
    RouterModule.forRoot(appRoutes),
    FeaturesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { MatButtonModule, MatIconModule } from '../../node_modules/@angular/material';
import { FuseProgressBarModule } from '../@core/components/progress-bar/progress-bar.module';
import { CoreSharedModule } from '../@core/core.module';
import { CoreSidebarModule } from '../@core/components/sidebar/sidebar.module';
import { LayoutModule } from './layout/layout.module';
import { fuseConfig } from './config';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { Error500Component } from './pages/errors/error500/error500.component';
import { Error404Component } from './pages/errors/error404/error404.component';
import { CookieService } from 'ngx-cookie-service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './MockData/data.service';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    Error500Component,
    MaintenanceComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FuseProgressBarModule,
    CoreSidebarModule,
    LayoutModule,
    CoreSharedModule.forRoot(fuseConfig),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

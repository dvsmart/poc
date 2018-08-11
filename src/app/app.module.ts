import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { MatButtonModule, MatIconModule } from '../../node_modules/@angular/material';
import { FuseProgressBarModule } from '../@core/components/progress-bar/progress-bar.module';
import { CoreSharedModule } from '../@core/core.module';
import { FuseSidebarModule } from '../@core/components/sidebar/sidebar.module';
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { LayoutModule } from './layout/layout.module';
import { fuseConfig } from './config';
import { AuthGuard } from './login/auth.guard';
import { FeaturesModule } from './features/features.module';

FeaturesModule

const appRoutes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    loadChildren:'./features/features.module#FeaturesModule'
  }
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: 'login',
  //   loadChildren: './login/login.module#LoginModule'
  // },
  
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreSharedModule.forRoot(fuseConfig),
    MatButtonModule,
    MatIconModule,

    FuseProgressBarModule,

    FuseSidebarModule,

    LayoutModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

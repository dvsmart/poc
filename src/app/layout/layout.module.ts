import { NgModule } from '@angular/core';
import { RouterModule } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../@core/core.module';
import { CoreSidebarModule } from '../../@core/components/sidebar/sidebar.module';
import { ContentModule } from './components/content/content.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { CoreNavigationModule } from '@core/components/navigation/navigation.module';
import { QuickPanelModule } from './components/quick-panel/quick-panel.module';
import { MessageService } from '@core/services/message.service';
import { ToasterComponent } from 'app/layout/components/toaster/toaster.component';
import { ToasterModule } from 'app/layout/components/toaster/toaster.module';
import { MatSnackBarModule } from '@angular/material';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { FuseProgressBarModule } from '@core/components/progress-bar/progress-bar.module';

@NgModule({
  imports: [
    RouterModule,
    CoreSharedModule,
    CoreSidebarModule,
    MatSnackBarModule,
    ContentModule,
    NavbarModule,
    ToolbarModule,
    QuickPanelModule,
    CoreNavigationModule,
    ToasterModule,
    FuseProgressBarModule
  ],
  exports:[AppLayoutComponent,SiteLayoutComponent],
  providers:[MessageService],
  declarations:[AppLayoutComponent,SiteLayoutComponent],
  entryComponents:[ToasterComponent]
})
export class LayoutModule { }

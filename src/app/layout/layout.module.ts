import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../@core/core.module';
import { FuseSidebarModule } from '../../@core/components/sidebar/sidebar.module';
import { ContentModule } from './components/content/content.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { CoreNavigationModule } from '@core/components/navigation/navigation.module';
import { QuickPanelModule } from './components/quick-panel/quick-panel.module';
import { MessageService } from '@core/services/message.service';
import { ToasterComponent } from 'app/layout/components/toaster/toaster.component';
import { ToasterModule } from 'app/layout/components/toaster/toaster.module';
import { MatSnackBarModule } from '@angular/material';


@NgModule({
  imports: [
    RouterModule,
    CoreSharedModule,
    FuseSidebarModule,
    MatSnackBarModule,
    ContentModule,
    NavbarModule,
    ToolbarModule,
    QuickPanelModule,
    CoreNavigationModule,
    ToasterModule
  ],
  exports:[LayoutComponent],
  providers:[MessageService],
  declarations:[LayoutComponent],
  entryComponents:[ToasterComponent]
})
export class LayoutModule { }

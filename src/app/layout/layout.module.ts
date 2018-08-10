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

@NgModule({
  imports: [
    RouterModule,

    CoreSharedModule,
    FuseSidebarModule,

    ContentModule,
    NavbarModule,
    ToolbarModule,
    QuickPanelModule,
    CoreNavigationModule
  ],
  exports:[LayoutComponent],
  declarations:[LayoutComponent]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { RouterModule } from '../../../../../node_modules/@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule } from '../../../../../node_modules/@angular/material';
import { CoreSharedModule } from '@core/core.module';
import { FuseSearchBarModule } from '@core/components/search-bar/search-bar.module';

@NgModule({
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    CoreSharedModule,
    FuseSearchBarModule
  ],
  exports: [ToolbarComponent],
  declarations: [ToolbarComponent]
})
export class ToolbarModule { }

import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { RouterModule } from '../../../../../node_modules/@angular/router';
import { CoreSharedModule } from '../../../../@core/core.module';

@NgModule({
  imports: [
    RouterModule,
    CoreSharedModule
  ],
  exports:[ContentComponent],
  declarations: [ContentComponent]
})
export class ContentModule { }

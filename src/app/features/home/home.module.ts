import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreSharedModule } from '@core/core.module';
import { RouterModule } from '../../../../node_modules/@angular/router';

const routes = [
  {
      path     : '',
      component: HomeComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreSharedModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

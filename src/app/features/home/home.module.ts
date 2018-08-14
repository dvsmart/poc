import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreSharedModule } from '@core/core.module';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
];


@NgModule({
  imports: [
    CoreSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { CoreSharedModule } from '@core/core.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'asset/properties',
    loadChildren: './asset/asset.module#AssetModule'
  },
  {
    path: 'assessment',
    loadChildren: './assessment/assessment.module#AssessmentModule'
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreSharedModule
  ],
  declarations: []
})
export class FeaturesModule { }
